const escape = value => String(value).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
export const footer = 'Documento gerado com apoio de IA e revisado pela equipe de engenharia da Carparts antes do envio.';

export function renderNotes(notes) {
  const categories = ['Nova funcionalidade', 'Correção', 'Segurança', 'Interna'];
  const sections = categories.map(type => {
    const items = notes.itens.filter(i => i.tipo === type);
    return items.length ? `<h2>${type}</h2><ul>${items.map(i => `<li>${escape(i.resumo)}</li>`).join('')}</ul>` : '';
  }).join('');
  // Rascunhos não podem afirmar uma revisão humana que ainda não ocorreu.
  const cliente = `<!doctype html><html lang="pt-BR"><meta charset="utf-8"><title>Notas de versão – Carparts</title><style>body{font:16px Arial;max-width:850px;margin:40px auto;line-height:1.6;padding:20px}h1{font-size:28px}h2{font-size:21px}footer{border-top:1px solid #bbb;margin-top:30px;padding-top:15px}</style><h1>Notas de versão – Carparts</h1><p>Versão ${escape(notes.versao)} | ${escape(notes.data)}</p><p><strong>Rascunho. Revisão e aprovação pendentes. Não enviar a clientes.</strong></p><p>${escape(notes.resumo_geral)}</p>${sections}<footer>Documento gerado com apoio de IA. Revisão pela equipe de engenharia da Carparts pendente.</footer></html>`;
  const review = notes.itens.filter(i => i.tipo === 'Revisar');
  const revisao = `<!doctype html><html lang="pt-BR"><meta charset="utf-8"><title>Revisão Carparts</title><h1>Itens para revisão do tech lead</h1><ul>${review.map(i => `<li>Linha ${i.linha}: ${escape(i.resumo)}</li>`).join('')}</ul><p>${review.length ? 'Esclarecer os itens antes da publicação.' : 'Nenhum item ambíguo.'}</p></html>`;
  return { cliente, revisao };
}

export function approveDraft(html, approval) {
  if (!approval?.responsavel || !approval?.data || !approval?.referencia) throw new Error('Aprovação sem responsável, data e referência.');
  return html.replace('<p><strong>Rascunho. Revisão e aprovação pendentes. Não enviar a clientes.</strong></p>', '').replace('Documento gerado com apoio de IA. Revisão pela equipe de engenharia da Carparts pendente.', footer);
}
