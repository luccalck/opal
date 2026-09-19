# E6 · Tempo, custo e evolução

Foi feita uma medição controlada com as três entradas fictícias. A redação direta, registrada em `docs/metricas/baseline-manual-tres-releases.md`, levou 20,9 segundos entre o início e o salvamento. A sessão assistida registrada pelas capturas do Opal decorreu entre 21:32:00 e 21:33:07, totalizando 67 segundos até o Google Docs. Os testes locais consumiram zero chamadas de API.

Medir os mesmos três casos antes e depois. Antes: redação manual e revisão. Depois: preparação, execução, correção e revisão. Usar a mediana dos três tempos; ganho = (mediana antes − mediana depois) / mediana antes × 100. Não usar a duração de um teste de software como tempo poupado pelo tech lead.

| Caso | Antes em minutos | Depois em minutos | Tempo de revisão incluído | Evidência |
|---|---|---|---|---|
| lote rel-001 a rel-003 | 0,35 | 1,12 | sim | arquivo manual e capturas reais do Opal |

Nesta amostra curta, o Opal levou 46,1 segundos a mais, aumento de 220,6%. Portanto, não é correto afirmar aceleração com apenas esse ensaio. O ganho observado foi padronização, separação de itens ambíguos e geração direta do documento. A próxima medição deve envolver pelo menos dez releases e uma pessoa da equipe, porque a redação executada neste exercício não representa produtividade humana normal.

Planejamento da API: Gemini 3.7 Flash, Standard. Preço consultado em 18/09/2026: US$ 0,75/milhão de entrada e US$ 3,75/milhão de saída até 31/12/2026. A partir de 01/01/2027, respectivamente US$ 1,50 e US$ 7,50. Saída inclui raciocínio. Fonte: https://ai.google.dev/gemini-api/docs/pricing.

Hipótese conservadora por chamada: 3.000 tokens de entrada e 2.048 de saída. Custo = (3.000 × 0,75 + 2.048 × 3,75) / 1.000.000 = US$ 0,00993. Dez casos: US$ 0,0993. Oito versões com 40 execuções de avaliação no mês: 400 chamadas = US$ 3,972. Acrescentar 20 chamadas de geração e 50% de reserva: (420 × 0,00993) × 1,5 = US$ 6,2559/mês. Essa é uma estimativa, não uso medido; atualizar com usageMetadata. A cotação muda se o modelo mudar.

Reservas mensais propostas: US$ 200 para assistentes da equipe, US$ 30 para notas/CI, US$ 50 para piloto comercial e US$ 20 de contingência = US$ 300. Os US$ 200 não representam planos contratados. Confirmar as despesas de todas as ferramentas antes de ativar o piloto. Limite de avaliação por execução US$ 1, alertas de orçamento em 50/80/100%, limite de requisições e interrupção operacional ao atingir a reserva. Alertas do provedor não são um bloqueio financeiro automático.

A API registra tokens e custo estimado por execução em outputs/eval-live.json. Interromper chamadas ao esgotar a reserva. Não reenviar indefinidamente casos que falham. O lead time de 11 dias e a meta de 2 dias são contexto da aula: não afirmar que foram alcançados por este projeto.

Assistente comercial: começar no Opal com conteúdo fictício ou público e sem memória. Promover apenas após validar no mínimo 20 perguntas, atingir 90% de respostas corretas, zero divulgação de sigilo, referência ao documento aprovado em todas as respostas, recusa correta fora do escopo e custo previsto dentro da reserva. Antes de atendimento real, passar por repositório, testes, homologação e aprovação. A API em nuvem não passa a aceitar ERP só porque o prompt virou código.
