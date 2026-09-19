import { readFileSync } from 'node:fs';
import Ajv from 'ajv';

export const schema = JSON.parse(readFileSync(new URL('./schema.json', import.meta.url), 'utf8'));
const check = new Ajv({ allErrors: true }).compile(schema);
const implementation = /\b(?:hash|branch|commit|lodash|Jenkins|README|src\/|bugfix|hotfix|part number|SKU|RFQ|lead time|ETA|CVE)\b|\b\w+\.(?:js|mjs|java|py)\b/i;

export function validateNotes(notes, lineCount) {
  if (!check(notes)) throw new Error('Resposta fora do JSON Schema.');
  const used = [...notes.itens.map(i => i.linha), ...notes.ignorados];
  if (used.length !== lineCount || new Set(used).size !== lineCount || used.some(i => i > lineCount)) throw new Error('Linhas omitidas, repetidas ou inexistentes.');
  if (notes.resumo_geral.split('\n').length > 3 || notes.resumo_geral.length > 360) throw new Error('Resumo geral longo.');
  if (implementation.test(notes.resumo_geral)) throw new Error('Implementação exposta no resumo.');
  if (notes.itens.filter(i => i.tipo === 'Interna').length > 3) throw new Error('Mais de três itens internos.');
  for (const item of notes.itens) {
    if (item.resumo.trim().split(/\s+/).length > 20) throw new Error('Item acima de 20 palavras.');
    if (/[\r\n]/.test(item.resumo)) throw new Error('Item deve ocupar uma frase.');
    if (!/^(?:Adiciona|Permite|Corrige|Reforça|Exibe|Organiza|Simplifica|Solicita|Atualiza|Melhora|Remove|Ajusta|Protege|Apresenta|Disponibiliza|Inclui|Evita|Valida|Mantém|Padroniza|Otimiza|Facilita|Restringe|Bloqueia)\b/u.test(item.resumo.trim())) throw new Error('Item sem verbo no presente previsto no contrato.');
    if (item.tipo !== 'Revisar' && implementation.test(item.resumo)) throw new Error('Implementação exposta ao cliente.');
  }
  return notes;
}
