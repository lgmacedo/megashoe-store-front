import apiClient from "./api.client.js";
import { getProdutosPorId } from "./produto.services.js";

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

async function checarDisponibilidade(id) {
  try {
    const res = await apiClient.get(`/produtos/checar/${id}`);
    return res;
  } catch (err) {
    throw Error(err.response?.data ?? err.message);
  }
}

export { buscarProdutosCarrinho, checarDisponibilidade };
