import styled from "styled-components";
import { useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import apiAuth from "../services/auth.services";
import { useMutation } from "../hooks/request.hooks.js";
import { CarregamentoModal, ErroModal } from "../components/Modal.js";
import { BotaoCustom } from "../styled.js";

export default function Cadastro() {
  const [form, setForm] = useState({ nome: "", email: "" });
  const [valida, setValida] = useState(false);
  const [senha, setSenha] = useState("");
  const [senhaRep, setSenhaRep] = useState("");
  const navigate = useNavigate();

  const { loading, error, mutate } = useMutation(cadastro);

  function handleForm(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  useEffect(() => {
    setValida(senha === senhaRep);
  }, [senha, senhaRep]);

  async function cadastro() {
    try {
      if (!valida) {
        throw Error("As senhas não correspondem!");
      }
      await apiAuth.cadastro({ ...form, senha: senha });
      navigate("/");
    } catch (err) {
      if (err.response?.data) {
        throw Error(err.response.data);
      }
      throw Error(err.message);
    }
  }

  function handleCadastro(e) {
    e.preventDefault();
    mutate();
  }

  return (
    <CadastroContainer>
      <CarregamentoModal mostrar={loading} />
      <ErroModal mostrar={error !== null}>{error?.message}</ErroModal>
      <Titulo>
        <h1>Cadastro</h1>
        <p>Cria sua conta com email e senha</p>
      </Titulo>
      <Form onSubmit={handleCadastro}>
        <input
          name="nome"
          placeholder="nome"
          type="text"
          value={form.nome}
          onChange={handleForm}
          required
        />
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
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          required
        />
        <input
          name="senhaRep"
          placeholder="confirmar senha"
          type="password"
          autoComplete="new-password"
          value={senhaRep}
          onChange={(e) => setSenhaRep(e.target.value)}
          required
        />
        <BotaoCustom type="submit">Cadastrar</BotaoCustom>
      </Form>

      <Login to="/">
        Já possui uma conta? <span>Faça login!</span>
      </Login>
    </CadastroContainer>
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

const CadastroContainer = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const Login = styled(Link)`
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
  input,
  button {
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
`;
