import styled from "styled-components";
import Navegacao from "../components/Navegacao.js";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext.js";
import { BotaoCustom } from "../styled.js";
import { useNavigate } from "react-router-dom";

export default function User() {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  function handleLogout() {
    setUser(null);
    localStorage.removeItem("user");
    navigate("/");
  }

  return (
    <UserMain>
      <h1>Olá, {user.nome}!</h1> <Navegacao index={1} />
      <BotaoCustom onClick={handleLogout}>Sair</BotaoCustom>
    </UserMain>
  );
}
const UserMain = styled.main`
  padding: 32px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 75px);
  gap: 32px;

  h1 {
    font-size: 24px;
  }
`;
