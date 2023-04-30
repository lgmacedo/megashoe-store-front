import { AxiosError } from "axios";
import apiClient from "./api.client.js";

async function listarPedidos({ token }) {
  try {
    const res = await apiClient.get("/pedidos", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (err) {
    if (err instanceof AxiosError) {
      throw Error(err.response?.data ?? err.message);
    }
    throw Error("Algo deu errado, tente novamente");
  }
}

async function getPedido({ idPedido, token }) {
  try {
    const res = await apiClient.get(`/pedidos/${idPedido}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (err) {
    if (err instanceof AxiosError) {
      throw Error(err.response?.data ?? err.message);
    }
    throw Error("Algo deu errado, tente novamente");
  }
}

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

export { criarPedido, getPedido, listarPedidos };
