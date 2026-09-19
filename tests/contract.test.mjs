import test from 'node:test';
import assert from 'node:assert/strict';
import { validateNotes } from '../src/contract.mjs';
import { renderNotes, approveDraft, footer } from '../src/render.mjs';
import { generateNotes } from '../src/generate.mjs';

const sample = () => ({ versao: '4.2.0', data: '2026-09-18', resumo_geral: 'Atualiza o portal de pedidos B2B.', itens: [{ linha: 1, tipo: 'Correção', resumo: 'Corrige a busca no catálogo de peças.', modulo: 'catálogo de peças' }], ignorados: [] });

test('aceita contrato completo e contabiliza linhas', () => assert.doesNotThrow(() => validateNotes(sample(), 1)));
test('rejeita categoria desconhecida', () => { const n = sample(); n.itens[0].tipo = 'Bug'; assert.throws(() => validateNotes(n, 1)); });
test('rejeita frase com mais de 20 palavras', () => { const n = sample(); n.itens[0].resumo = 'Corrige ' + 'palavra '.repeat(21); assert.throws(() => validateNotes(n, 1)); });
test('rejeita referência a implementação', () => { const n = sample(); n.itens[0].resumo = 'Corrige o arquivo src/app.js.'; assert.throws(() => validateNotes(n, 1)); });
test('rejeita linha omitida ou duplicada', () => { assert.throws(() => validateNotes(sample(), 2)); const n = sample(); n.ignorados = [1]; assert.throws(() => validateNotes(n, 1)); });
test('rejeita mais de três itens internos', () => { const n = sample(); n.itens = Array.from({ length: 4 }, (_, i) => ({ linha: i + 1, tipo: 'Interna', resumo: 'Organiza rotinas internas sem alteração perceptível.' })); assert.throws(() => validateNotes(n, 4)); });
test('rejeita resumo geral acima de três linhas', () => { const n = sample(); n.resumo_geral = 'a\nb\nc\nd'; assert.throws(() => validateNotes(n, 1)); });
test('renderiza Revisar fora das notas do cliente', () => { const n = sample(); n.itens[0].tipo = 'Revisar'; n.itens[0].resumo = 'Solicita esclarecimento da mudança informada.'; const r = renderNotes(n); assert.ok(!r.cliente.includes('Solicita esclarecimento')); assert.ok(r.revisao.includes('Itens para revisão do tech lead')); assert.ok(r.revisao.includes('Solicita esclarecimento')); });
test('escapa HTML e não executa conteúdo do modelo', () => { const n = sample(); n.itens[0].resumo = 'Corrige <script>alert(1)</script>.'; const r = renderNotes(n); assert.ok(!r.cliente.includes('<script>')); assert.ok(r.cliente.includes('&lt;script&gt;')); });
test('não declara revisão humana sem registro', () => { const html = renderNotes(sample()).cliente; assert.ok(!html.includes(footer)); assert.throws(() => approveDraft(html, {})); assert.ok(approveDraft(html, { responsavel: 'revisor fictício', data: '2026-09-18', referencia: 'registro fictício de teste' }).includes(footer)); });
test('rejeita descrição sem verbo no presente', () => { const n = sample(); n.itens[0].resumo = 'A busca foi corrigida.'; assert.throws(() => validateNotes(n, 1)); });
test('rejeita dados não declarados fictícios antes da API', async () => { await assert.rejects(generateNotes({ dados: 'reais' }, {})); });
test('adapta chamada estruturada e contabiliza tokens incluindo raciocínio', async () => {
  let request;
  const mock = { models: { async generateContent(args) { request = args; return { text: JSON.stringify(sample()), usageMetadata: { promptTokenCount: 100, candidatesTokenCount: 50, thoughtsTokenCount: 10 } }; } } };
  const result = await generateNotes({ dados: 'ficticios', versao: '4.2.0', input: 'fix fictício' }, mock);
  assert.equal(request.config.responseMimeType, 'application/json');
  assert.equal(request.config.maxOutputTokens, 2048);
  assert.equal(result.usage.input, 100);
  assert.equal(result.usage.output, 60);
  assert.ok(result.usage.usd > 0);
});
