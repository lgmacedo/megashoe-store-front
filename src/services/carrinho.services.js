import axios from "axios";
import { getItensCarrinho } from "../storage/carrinho.storage.js";

const client = axios.create({ baseURL: process.env.REACT_APP_API_URL });

async function getProdutoById(idProduto) {
  try {
    const res = await client.get(`/produtos/${idProduto}`);
    return res.data;
  } catch (err) {
    return null;
  }
}

async function buscarProdutosCarrinho() {
  const idItems = getItensCarrinho();
  const produtosBuscados = [];

  for (let id of idItems) {
    const produtoEncontrado = produtosBuscados.find((p) => {
      return p._id === id;
    });
    if (produtoEncontrado) {
      produtoEncontrado.quantidade++;
      continue;
    }
    const data = await getProdutoById(id);
    if (!data) continue;
    data.quantidade = 1;
    produtosBuscados.push(data);
  }

  return produtosBuscados;
}

export { getProdutoById, buscarProdutosCarrinho };
