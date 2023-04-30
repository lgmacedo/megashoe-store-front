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

export { getProdutosPorId };
