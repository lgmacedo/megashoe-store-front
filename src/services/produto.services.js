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

async function buscarProdutos() {
  try {
    return (await apiClient.get("/produtos")).data;
  } catch (err) {
    throw Error(err.response?.data ?? err.message);
  }
}

export { getProdutosPorId, buscarProdutos };
