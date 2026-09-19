# Configuração do GitHub

- Repositório: https://github.com/luccalck/opal
- Branch principal: `main`
- CODEOWNERS: `luccalck` para prompts, código, avaliação e workflow
- Proteção: branch atualizada, check `quality`, conversa resolvida, um revisor e revisão do CODEOWNERS
- Environment `prompt-eval`: somente branch protegida; variável `GEMINI_MODEL=gemini-2.5-flash`
- Environment `homologacao`: somente branch protegida
- Segredo `GEMINI_API_KEY`: será adicionado pelo proprietário depois da execução do AI Studio; nunca deve entrar no Git
- Execução aprovada: https://github.com/luccalck/opal/actions/runs/35410014676

O artefato `contrato-offline` dessa execução contém a avaliação aprovada, a avaliação deliberadamente reprovada e o respectivo log. A execução remota com o modelo permanece bloqueada até a configuração do segredo pelo proprietário.
