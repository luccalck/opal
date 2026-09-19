# E1 · Mapa de oportunidades

Lucca Castilho Costa | RA 26179873 | 2ADS

Os tempos abaixo são hipóteses para priorização, não medições realizadas. A avaliação real inclui revisão humana. Só entram dados públicos ou fictícios.

| Prioridade | Tarefa | Caminho | Valor e ganho estimado | Dados e controle do risco | Custo planejado |
|---|---|---|---|---|---|
| 1 | Notas de versão | Opal → AI Studio → esteira | Padronizar e reduzir redação de 240 para 45 min por versão, ganho hipotético de 81,25% | Commits fictícios; excluir detalhes de implementação; revisão antes de envio | Reserva API até US$ 30/mês; aprovação humana |
| 2 | Casos de teste | só Opal (apoio) | Rascunho de cenários, de 60 para 25 min, ganho hipotético de 58,3% | Esquemas públicos e exemplos inventados; QA valida cada cenário | Experimento sem tarifa publicada; limitar a 20 sessões/mês e reconferir preço |
| 3 | Descrições de PR | só Opal (apoio) | Rascunho uniforme, de 20 para 10 min, ganho hipotético de 50% | Resumo fictício, sem código proprietário; autor revisa os riscos | Até 40 sessões/mês; evitar chamadas repetidas |
| 4 | Assistente comercial sobre mudanças | Opal → AI Studio → esteira | Explicar funcionalidades públicas; hipótese de reduzir preparação de 45 para 20 min | Apenas documentação já aprovada; sem pedidos ou preço; referências e recusa fora do escopo | Reserva futura até US$ 50/mês, somente após piloto |
| 5 | Cálculo de preço contratual e prazo firme | não usar IA | Regra determinística auditável é mais confiável; IA não elimina conferência | Dado de ERP e contrato não sai da rede; cálculo local com regra validada | US$ 0 de IA nessa tarefa |
| 6 | Revogação de credenciais e aprovação de produção | não usar IA | Ação precisa de autoridade e registro, não de geração de texto | IAM, revisão pelo administrador e aprovação humana; IA não concede acesso | US$ 0 de IA nessa tarefa |

Risco aceito: o rascunho pode omitir ou classificar mal uma mudança. O controle é cobertura de todas as linhas, testes com casos ambíguos, comparação com os commits e revisão registrada. Não se aceita risco de divulgar dado sigiloso. Protótipo até 25/09/2026; promoção ao código até 09/10/2026, condicionada aos gates.
