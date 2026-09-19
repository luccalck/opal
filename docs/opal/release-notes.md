# Opal · Release Notes Carparts

- Link publicado: https://opal.google/app/18dTNITEyNP1dVxL5NCYC74FPGeEcdv0r
- Dono: Lucca Castilho Costa, RA 26179873, turma 2ADS.
- Compartilhamento previsto: equipe Carparts e professor somente para uso; edição restrita ao dono e revisores autorizados. Conferir também o arquivo no Drive.
- Criada em: 18/09/2026.
- Versão revisada: v3 local e aplicativo publicado em 18/09/2026. Editor, Preview, Console e saída no Google Docs foram registrados em quatro capturas reais.
- Próxima revisão: 18/10/2026 ou imediatamente após mudança de modelo, prompt ou permissão.

## Finalidade

Transformar commits fictícios de uma versão em rascunhos padronizados de notas para montadoras clientes. Nenhuma saída é enviada automaticamente ao cliente.

## Passos

| # | Tipo | Nome | Modelo / ferramenta | Saída |
|---|---|---|---|---|
| 1 | User Input | Commits da versão | Texto obrigatório, incluindo versão | Lista fictícia de mudanças |
| 2 | Generate | Classificar mudanças | Gemini Flash disponível no editor | Tabela tipo, resumo, módulo; Revisar para ambiguidade |
| 3 | Generate | Redigir notas | Gemini Pro disponível no editor | Rascunho por categoria, com revisão separada |
| 4 | Output | Página web | Webpage with auto-layout | Página para revisão |
| 5 | Output | Google Docs | Save to Google Docs | Documento para revisão |

Asset: Guia_de_estilo_Carparts.pdf. Classificação referencia @Commits da versão e @Guia de estilo. Redação referencia @Classificar mudanças e @Guia de estilo. As duas saídas referenciam @Redigir notas. Registrar os nomes e versões efetivamente oferecidos pelo editor durante a execução.

Roteamento inicial separa Revisar do conteúdo para clientes. Para o nível avançado, adicionar triagem Agent com @Go to para esclarecimento de entradas ambíguas, sem memória ou busca. O objetivo é evitar invenções no rel-003; não automatizar aprovação. Essa extensão precisa de print e teste real, ainda pendentes.

## Dados permitidos

Somente públicos ou fictícios. Proibidos nomes de clientes, pessoas, pedidos, preços, ERP e credenciais. A identificação do aluno fica na documentação acadêmica, não nas entradas de IA. Não compartilhar edição publicamente.

## Entradas de referência

eval/golden.jsonl contém rel-001 a rel-010. Os três primeiros reproduzem as referências do professor. eval/fixtures.json contém respostas manuais para testar o contrato, não resultados de IA. Os logs em docs/opal/evidencias comprovam execução local offline. As capturas `01` a `04` da mesma pasta comprovam o editor visual, o Preview, o Console e a saída real em Google Docs. A comparação online com o AI Studio permanece pendente.

## Prompt validado

prompts/release-notes.v3.md está preparado e coberto por testes de contrato. A validação comparativa das três entradas no Opal e no AI Studio ainda precisa ser registrada. O código local foi escrito a partir da documentação do SDK, não obtido por Get code. Registrar o trecho original de Get code em docs/ai-studio após a etapa externa e comparar com src/generate.mjs.

## Revisão e promoção

Revisão de permissões mensal pelo dono e tech lead. Retestar os dez casos a cada mudança. A promoção exige avaliação online de pelo menos 90%, ausência de falhas críticas de sigilo, revisão de prompt em PR, homologação e aprovação com responsável, data e referência. Uma reprovação não pode ser contornada alterando o limiar.

## Fontes consultadas em 18/09/2026

- https://developers.google.com/opal/overview
- https://developers.google.com/opal/Agent_Mode
- https://ai.google.dev/gemini-api/docs/structured-output
- https://github.com/googleapis/js-genai
- https://ai.google.dev/gemini-api/docs/pricing
