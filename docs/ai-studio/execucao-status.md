# Execução do AI Studio

Em 18/09/2026, o prompt e o schema foram configurados no Google AI Studio. A execução do primeiro caso retornou `permission denied` porque a conta estava sem uma chave de API paga vinculada. Nenhum dado real foi enviado e nenhuma chave foi criada ou armazenada pelo projeto.

O botão **Get code** foi executado e o código TypeScript original foi salvo em `get-code-original.ts`. O trecho usa `process.env['GEMINI_API_KEY']`, portanto não contém segredo. A execução dos três casos, as respostas JSON e as capturas do AI Studio ainda dependem da vinculação da chave pelo proprietário da conta.
