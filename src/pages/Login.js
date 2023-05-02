import styled from "styled-components";
import { useNavigate, Link } from "react-router-dom";
import { useState, useContext } from "react";
import apiAuth from "../services/auth.services";
import { UserContext } from "../contexts/UserContext";
import { BotaoCustom } from "../styled.js";
import { useMutation } from "../hooks/request.hooks.js";
import { CarregamentoModal, ErroModal } from "../components/Modal.js";

export default function Login() {
  const [form, setForm] = useState({ email: "", senha: "" });
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const { loading, error, mutate } = useMutation(login);

  function handleForm(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function login() {
    try {
      const res = await apiAuth.login({ ...form });
      const { idUsuario, nome, email, token } = res.data;
      setUser({ idUsuario, nome, email, token });
      localStorage.setItem(
        "user",
        JSON.stringify({ idUsuario, nome, email, token })
      );
      navigate("/home");
    } catch (err) {
      throw Error(err.response.data);
    }
  }

  function handleLogin(e) {
    e.preventDefault();
    mutate();
  }

  return (
    <LoginContainer>
      <CarregamentoModal mostrar={loading} />
      <ErroModal mostrar={error !== null}>{error?.message}</ErroModal>
      <Titulo>
        <h1>Bem vindo!</h1>
        <p>Faça login com email e senha</p>
      </Titulo>
      <Form onSubmit={handleLogin}>
        <input
          name="email"
          placeholder="email"
          type="email"
          value={form.email}
          onChange={handleForm}
          required
        />
        <input
          name="senha"
          placeholder="senha"
          type="password"
          autoComplete="new-password"
          value={form.senha}
          onChange={handleForm}
          required
        />
        <BotaoCustom type="submit">Entrar</BotaoCustom>
      </Form>

      <Cadastro to="/cadastro">
        Não possui uma conta? <span>Cadastre-se!</span>
      </Cadastro>
    </LoginContainer>
  );
}

const Titulo = styled.div`
  width: calc(100% - 64px);
  font-family: "Lexend Deca";
  font-style: normal;
  h1 {
    font-weight: 700;
    font-size: 24px;
    color: #fafafa;
    line-height: 30px;
  }
  p {
    font-weight: 400;
    font-size: 14px;
    color: #a3a3a3;
  }
  margin-bottom: 10%;
`;

const LoginContainer = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const Cadastro = styled(Link)`
  margin-top: 32px;
  font-style: normal;
  line-height: 18px;
  font-family: "Lexend Deca";
  font-weight: 400;
  text-decoration: none;
  color: #fafafa;
  span {
    color: #a3e635;
  }
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 8px;
  width: 100%;
  border-radius: 5px;
  input {
    height: 45px;
    background: #404040;
    border-radius: 12px;
    border: none;
    width: calc(100% - 64px);
    outline: none;
    padding: 15px;
    margin: 1px;
    font-size: 18px;
    color: white;
    font-family: "Lexend Deca";
    ::placeholder {
      font-family: "Lexend Deca";
      font-style: normal;
      font-weight: 400;
      font-size: 18px;
      line-height: 22px;
    }
  }

  button {
    width: calc(100% - 64px);
  }
`;
