import { readFileSync } from 'node:fs';
import { GoogleGenAI } from '@google/genai';
import { schema, validateNotes } from './contract.mjs';

export const MODEL = process.env.GEMINI_MODEL || 'gemini-3.7-flash';
export const rates = new Date() < new Date('2027-01-01T00:00:00Z') ? { input: 0.75, output: 3.75 } : { input: 1.50, output: 7.50 }; // Gemini 3.7 Flash Standard, US$/milhão, consulta em 18/09/2026.
export const MAX_OUTPUT_TOKENS = 2048;

export async function generateNotes(entry, client) {
  if (MODEL !== 'gemini-3.7-flash') throw new Error('Modelo alterado sem tabela de preços e revisão do contrato.');
  if (entry.dados !== 'ficticios') throw new Error('Somente casos fictícios aprovados para esta atividade.');
  if (!client && !process.env.GEMINI_API_KEY) throw new Error('Configure GEMINI_API_KEY no ambiente, sem gravar em arquivos.');
  const ai = client || new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY, httpOptions: { timeout: 60000 } });
  const prompt = readFileSync(new URL('../prompts/release-notes.v3.md', import.meta.url), 'utf8');
  const response = await ai.models.generateContent({
    model: MODEL,
    contents: JSON.stringify({ versao: entry.versao, data: '2026-09-18', linhas: entry.input.split('\n').map((texto, i) => ({ linha: i + 1, texto })) }),
    config: { systemInstruction: prompt, temperature: 0, maxOutputTokens: MAX_OUTPUT_TOKENS, responseMimeType: 'application/json', responseJsonSchema: schema }
  });
  let notes;
  try { notes = JSON.parse(response.text); } catch { throw new Error('JSON inválido ou resposta truncada.'); }
  validateNotes(notes, entry.input.split('\n').length);
  if (notes.versao !== entry.versao || notes.data !== '2026-09-18') throw new Error('Versão ou data divergente.');
  const usage = response.usageMetadata;
  const input = usage?.promptTokenCount;
  const output = (usage?.candidatesTokenCount ?? 0) + (usage?.thoughtsTokenCount ?? 0);
  if (!Number.isFinite(input) || !Number.isFinite(usage?.candidatesTokenCount)) throw new Error('Uso de tokens indisponível; custo não verificável.');
  return { notes, usage: { input, output, usd: (input * rates.input + output * rates.output) / 1e6 } };
}
