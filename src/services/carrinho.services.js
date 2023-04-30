import apiClient from "./api.client.js";

async function getProdutosPorId(idsProdutos) {
  try {
    const res = await apiClient.get(`/produtos/muitos`, {
      params: { ids: idsProdutos },
    });
    return res.data;
  } catch (err) {
    return null;
  }
}

function contarProdutosNoCarrinho(ids) {
  const contagemIds = {};
  ids.forEach((id) => {
    if (!id) return;
    if (contagemIds[id] !== undefined) {
      contagemIds[id]++;
    } else {
      contagemIds[id] = 1;
    }
  });
  return contagemIds;
}

async function buscarProdutosCarrinho(ids) {
  if (!ids) return [];
  const produtos = await getProdutosPorId(ids);

  if (!produtos) return [];
  const contagemIds = contarProdutosNoCarrinho(ids);

  produtos?.forEach(
    (produto) => (produto.quantidadeSelecionada = contagemIds[produto._id])
  );
  return produtos ?? [];
}

export { buscarProdutosCarrinho };
