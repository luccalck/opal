# Configuração do GitHub

- Repositório: https://github.com/luccalck/opal
- Branch principal: `main`
- CODEOWNERS: `luccalck` para prompts, código, avaliação e workflow
- Proteção: branch atualizada, check `quality`, conversa resolvida, um revisor e revisão do CODEOWNERS
- Environment `prompt-eval`: somente branch protegida; variável `GEMINI_MODEL=gemini-2.5-flash`
- Environment `homologacao`: somente branch protegida
- Segredo `GEMINI_API_KEY`: será adicionado pelo proprietário depois da execução do AI Studio; nunca deve entrar no Git
- Execução aprovada inicial: https://github.com/luccalck/opal/actions/runs/35410014676
- Execução aprovada após a configuração final: https://github.com/luccalck/opal/actions/runs/35410118227
- Execução deliberadamente reprovada pelo gate de 80%: https://github.com/luccalck/opal/actions/runs/35410123077

O artefato `contrato-offline` contém a avaliação aprovada, a avaliação deliberadamente reprovada e o respectivo log. A execução 35410123077 também comprova que a reprovação encerra o workflow com falha. A execução remota com o modelo permanece bloqueada até a configuração do segredo pelo proprietário.
