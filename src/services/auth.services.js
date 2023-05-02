import apiClient from "./api.client.js";

function login(body) {
  const promise = apiClient.post("/", body);
  return promise;
}

function cadastro(body) {
  const promise = apiClient.post(`/cadastro`, body);
  return promise;
}

const apiAuth = { login, cadastro };
export default apiAuth;
