import { readFileSync, mkdirSync, writeFileSync } from 'node:fs';
import { validateNotes } from '../src/contract.mjs';
import { generateNotes, MODEL, rates } from '../src/generate.mjs';

const mode = process.argv.includes('--live') ? 'live' : process.argv.includes('--offline') ? 'offline' : null;
if (!mode) { console.error('Informe --offline ou --live.'); process.exit(1); }
if (mode === 'live' && !process.env.GEMINI_API_KEY) { console.error('Chave ausente. Nenhuma chamada executada.'); process.exit(1); }
const fail = process.argv.includes('--intentional-failure');
const entries = readFileSync(new URL('../eval/golden.jsonl', import.meta.url), 'utf8').trim().split('\n').map(JSON.parse);
const fixtures = JSON.parse(readFileSync(new URL('../eval/fixtures.json', import.meta.url), 'utf8'));
const limit = 90;
const perRunBudget = 1;
let approved = 0;
let cost = 0;
const results = [];
console.log(`MODO ${mode.toUpperCase()}: ${mode === 'offline' ? 'fixtures manuais; NÃO é execução do modelo' : 'Gemini API real, dados fictícios'}`);
for (const [index, entry] of entries.entries()) {
  const begin = Date.now();
  let result;
  let ok = false;
  try {
    if (mode === 'live' && cost >= perRunBudget) throw new Error('Orçamento por execução atingido.');
    result = mode === 'live' ? await generateNotes(entry) : { notes: structuredClone(fixtures[entry.id]), usage: { input: 0, output: 0, usd: 0 } };
    cost += result.usage.usd;
    if (fail && index < 2) result.notes.itens.push({ linha: 999, tipo: 'Inválido', resumo: 'Falha deliberada.' });
    validateNotes(result.notes, entry.input.split('\n').length);
    if (result.notes.versao !== entry.versao) throw new Error('Versão divergente.');
    for (const [type, amount] of Object.entries(entry.expected)) {
      if (result.notes.itens.filter(i => i.tipo === type).length !== amount) throw new Error('Classificação divergente.');
    }
    const visible = result.notes.itens.filter(i => i.tipo !== 'Revisar').map(i => i.resumo).join(' ').toLowerCase();
    for (const term of entry.required) if (!visible.includes(term.toLowerCase())) throw new Error('Conteúdo necessário ausente.');
    for (const term of entry.forbidden) if (visible.includes(term.toLowerCase())) throw new Error('Conteúdo proibido.');
    ok = true;
    approved++;
  } catch { /* Relatórios não incluem mensagens da API, prompts nem credenciais. */ }
  console.log(`${entry.id}: ${ok ? 'APROVADO' : 'REPROVADO'}${fail && index < 2 ? ' (falha intencional)' : ''}`);
  results.push({ id: entry.id, approved: ok, ms: Date.now() - begin, usage: result?.usage ?? null, notes: ok ? result.notes : null });
}
const percentage = approved / entries.length * 100;
const passed = percentage >= limit && cost <= perRunBudget;
console.log(`Aprovação: ${approved}/${entries.length} (${percentage.toFixed(0)}%). Limiar: ${limit}%.`);
console.log(`Custo API estimado: US$ ${cost.toFixed(6)}. Limite: US$ ${perRunBudget.toFixed(2)}.`);
console.log(`Gate: ${passed ? 'APROVADO' : 'REPROVADO'}; exit code ${passed ? 0 : 1}.`);
mkdirSync('outputs', { recursive: true });
writeFileSync(`outputs/eval-${mode}${fail ? '-failure' : ''}.json`, JSON.stringify({ mode, model: mode === 'live' ? MODEL : null, rates, timestamp: new Date().toISOString(), percentage, passed, cost, results }, null, 2));
process.exitCode = passed ? 0 : 1;
