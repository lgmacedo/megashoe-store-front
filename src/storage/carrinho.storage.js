const KEY_CARRINHO = "carrinho";

function getItensCarrinho() {
  const itens = JSON.parse(localStorage.getItem(KEY_CARRINHO));
  return itens ?? [];
}

function setItensCarrinho(itens) {
  localStorage.setItem(KEY_CARRINHO, JSON.stringify(itens));
}

function addItemCarrinho(idItem) {
  const itens = getItensCarrinho();
  itens.push(idItem);
  setItensCarrinho(itens);
}

function removerUmItemCarrinho(idItem) {
  const itens = getItensCarrinho();
  const idx = itens.findIndex((id) => id === idItem);
  itens.splice(idx, 1);
  setItensCarrinho(itens);
}

function removerItemCarrinho(id) {
  const idItems = getItensCarrinho();
  const novosItens = idItems.filter((idItem) => idItem !== id);
  setItensCarrinho(novosItens);
}

function limparCarrinho() {
  localStorage.removeItem(KEY_CARRINHO);
}

export {
  getItensCarrinho,
  addItemCarrinho,
  setItensCarrinho,
  removerItemCarrinho,
  removerUmItemCarrinho,
  limparCarrinho,
};
