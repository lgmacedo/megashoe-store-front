import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import apiAuth from "../../services/auth.services";
import { UserContext } from "../../contexts/UserContext";
import { BotaoCustom } from "../../styled.js";
import { useMutation } from "../../hooks/request.hooks.js";
import { CarregamentoModal, ErroModal } from "../../components/Modal.js";
import { Cadastro, Form, LoginContainer, Titulo } from "./styled.js";

export default function Login() {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);
  const { loading, error, mutate } = useMutation(login);

  async function login({ email, senha }) {
    try {
      const res = await apiAuth.login({ email, senha });
      const user = res.data;
      setUser(user);
      localStorage.setItem("user", JSON.stringify(user));
      navigate("/home");
    } catch (err) {
      if (err.response?.data) throw Error(err.response.data);
      throw Error(err.message);
    }
  }

  function handleLogin(e) {
    e.preventDefault();
    const email = e.target["email"].value;
    const senha = e.target["senha"].value;
    mutate({ email, senha });
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
        <input name="email" placeholder="email" type="email" required />
        <input
          name="senha"
          placeholder="senha"
          type="password"
          autoComplete="new-password"
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
