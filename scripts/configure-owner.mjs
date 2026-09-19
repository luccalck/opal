import { writeFileSync } from 'node:fs';
const owner = process.argv[2];
if (!owner || !/^[a-zA-Z0-9][a-zA-Z0-9-]{0,38}$/.test(owner)) { console.error('Uso: node scripts/configure-owner.mjs usuario-real-do-github'); process.exit(1); }
writeFileSync(new URL('../.github/CODEOWNERS', import.meta.url), `# Responsável autorizado; habilitar revisão obrigatória nas regras da branch.\n/prompts/ @${owner}\n/src/ @${owner}\n/eval/ @${owner}\n/.github/ @${owner}\n`);
console.log('CODEOWNERS configurado. Confirme acesso de escrita do responsável e revisão obrigatória na branch.');
