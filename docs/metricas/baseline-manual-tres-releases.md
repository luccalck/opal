# Baseline manual de três releases fictícios

Produção controlada iniciada em 18/09/2026 às 21:36:41, usando somente as entradas fictícias fornecidas. O tempo inclui leitura, classificação e redação.

## Versão 4.2.0

### Novas funcionalidades

- Permite anexar a ordem de compra em PDF ao abrir um pedido.
- Exibe o prazo estimado de entrega de cada item da cotação.

### Correções

- Corrige números de peça duplicados na busca por aplicação.
- Corrige a interrupção ao listar pedidos com mais de 500 itens.

### Segurança

- Bloqueia o envio de arquivos executáveis no portal de pedidos.

### Revisar

- A extração do serviço de precificação exige análise antes de comunicação externa.

## Versão 4.2.1

### Correções

- Corrige o arredondamento do valor total na segunda via da nota fiscal.

### Segurança

- Atualiza a validação de sessões expiradas no portal de pedidos.

### Revisar

- O ajuste no pipeline de publicação não produz mudança destinada ao cliente.

## Caso de borda

### Novas funcionalidades

- Adiciona filtro por montadora compatível no catálogo de peças.

### Segurança

- Remove uma chave de API do repositório e passa a usar o segredo do pipeline.

### Revisar

- Os registros “wip”, “ajustes” e “fix” não possuem contexto suficiente.
- O registro de teste local não deve integrar as notas antes de revisão.
