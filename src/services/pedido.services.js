import { AxiosError } from "axios";
import apiClient from "./api.client.js";

async function criarPedido({ produtos, token }) {
  try {
    const res = await apiClient.post(
      "/pedidos",
      { produtos },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return res.data;
  } catch (err) {
    if (err instanceof AxiosError) {
      throw Error(err.response?.data ?? err.message);
    }
    throw Error("Algo deu errado, tente novamente");
  }
}

export { criarPedido };
