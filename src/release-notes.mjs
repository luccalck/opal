import { readFileSync, mkdirSync, writeFileSync } from 'node:fs';
import { generateNotes } from './generate.mjs';
import { renderNotes } from './render.mjs';

try {
  const entries = readFileSync(new URL('../eval/golden.jsonl', import.meta.url), 'utf8').trim().split('\n').map(JSON.parse);
  const id = process.argv[2];
  const entry = entries.find(e => e.id === id);
  if (!entry) throw new Error('Escolha rel-001 a rel-010. Exemplo: node src/release-notes.mjs rel-001');
  const result = await generateNotes(entry);
  const rendered = renderNotes(result.notes);
  mkdirSync('outputs', { recursive: true });
  writeFileSync(`outputs/${id}.json`, JSON.stringify(result, null, 2));
  writeFileSync(`outputs/${id}.html`, rendered.cliente);
  writeFileSync(`outputs/${id}-revisao.html`, rendered.revisao);
  console.log(`${id}: rascunho gerado. Custo estimado US$ ${result.usage.usd.toFixed(6)}. Aprovação pendente.`);
} catch {
  console.error('Geração interrompida. Confira ID, ambiente, acesso ao modelo e contrato. Nenhuma credencial foi registrada.');
  process.exitCode = 1;
}
