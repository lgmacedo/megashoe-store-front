import { AxiosError } from "axios";
import apiClient from "./api.client.js";

async function criarPedido(produtos) {
  try {
    const res = await apiClient.post(
      "/pedidos",
      { produtos },
      { headers: { Authorization: "Bearer jdqijdioqjwodhfudv" } }
    );
    return res.data;
  } catch (err) {
    if (err instanceof AxiosError) {
      throw Error(err.message);
    }
    throw Error("Algo deu errado, tente novamente");
  }
}

export { criarPedido };
