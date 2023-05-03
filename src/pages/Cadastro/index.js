import { useNavigate } from "react-router-dom";
import apiAuth from "../../services/auth.services";
import { useMutation } from "../../hooks/request.hooks.js";
import { CarregamentoModal, ErroModal } from "../../components/Modal.js";
import { BotaoCustom } from "../../styled.js";
import { CadastroContainer, Form, Login, Titulo } from "./styled.js";

export default function Cadastro() {
  const navigate = useNavigate();
  const { loading, error, mutate } = useMutation(cadastro);

  async function cadastro({ nome, email, senha, senhaRep }) {
    try {
      if (senha !== senhaRep) throw Error("As senhas não correspondem!");
      await apiAuth.cadastro({ nome, email, senha });
      navigate("/");
    } catch (err) {
      if (err.response?.data) throw Error(err.response.data);
      throw Error(err.message);
    }
  }

  function handleCadastro(e) {
    e.preventDefault();
    const nome = e.target["nome"].value;
    const email = e.target["email"].value;
    const senha = e.target["senha"].value;
    const senhaRep = e.target["senhaRep"].value;
    mutate({ nome, email, senha, senhaRep });
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
        <input name="nome" placeholder="nome" type="text" required />
        <input name="email" placeholder="email" type="email" required />
        <input
          name="senha"
          placeholder="senha"
          type="password"
          autoComplete="new-password"
          required
        />
        <input
          name="senhaRep"
          placeholder="confirmar senha"
          type="password"
          autoComplete="new-password"
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
