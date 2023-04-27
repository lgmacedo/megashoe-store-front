const KEY_CARRINHO = "carrinho";

function getItensCarrinho() {
  const itens = JSON.parse(localStorage.getItem(KEY_CARRINHO));
  return itens ?? [];
}

function setItensCarrinho(itens) {
  localStorage.setItem(KEY_CARRINHO, JSON.stringify(itens));
}

function addItemCarrinho(item) {
  localStorage.setItem(KEY_CARRINHO, JSON.stringify(item));
}

function removerItemCarrinho(id) {}

export {
  getItensCarrinho,
  addItemCarrinho,
  setItensCarrinho,
  removerItemCarrinho,
};
