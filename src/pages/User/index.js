import Navegacao from "../../components/Navegacao.js";
import { useCallback, useContext } from "react";
import { UserContext } from "../../contexts/UserContext.js";
import { BotaoCustom } from "../../styled.js";
import { useNavigate } from "react-router-dom";
import { UserMain } from "./styled.js";
import { listarPedidos } from "../../services/pedido.services.js";
import ResumoPedido from "../../components/ResumoPedido.js";
import { useRequest } from "../../hooks/request.hooks.js";
import { CarregamentoModal, ErroModal } from "../../components/Modal.js";

export default function User() {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const buscarPedidos = useCallback(
    async () => await listarPedidos({ token: user?.token }),
    [user?.token]
  );

  const { data: pedidos, loading, error } = useRequest(buscarPedidos);

  function handleLogout() {
    setUser(null);
    localStorage.removeItem("user");
    navigate("/");
  }

  return (
    <>
      <CarregamentoModal mostrar={loading} />
      <ErroModal mostrar={error !== null}>{error?.message}</ErroModal>
      <UserMain>
        {pedidos?.map((pedido) => (
          <div key={pedido._id}>
            <h2>Pedido #{pedido._id}</h2>
            <ResumoPedido
              produtos={pedido.produtos}
              criadoEm={pedido.criadoEm}
            />
          </div>
        ))}
        <BotaoCustom onClick={handleLogout}>Sair</BotaoCustom>
        <Navegacao index={1} />
      </UserMain>
    </>
  );
}
