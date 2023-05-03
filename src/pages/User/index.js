import Navegacao from "../../components/Navegacao.js";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../contexts/UserContext.js";
import { BotaoCustom } from "../../styled.js";
import { useNavigate } from "react-router-dom";
import { UserMain } from "./styled.js";
import { listarPedidos } from "../../services/pedido.services.js";

export default function User() {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [pedidos, setPedidos] = useState(null);

  function handleLogout() {
    setUser(null);
    localStorage.removeItem("user");
    navigate("/");
  }

  useEffect(() => {
    listarPedidos({ token: user.token }).then(setPedidos);
  }, [user.token]);

  console.log(pedidos);

  return (
    <UserMain>
      <h1>Olá, {user.nome}!</h1> <Navegacao index={1} />
      <BotaoCustom onClick={handleLogout}>Sair</BotaoCustom>
    </UserMain>
  );
}
