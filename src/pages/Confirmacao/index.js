import { useCallback, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { getPedido } from "../../services/pedido.services.js";
import { UserContext } from "../../contexts/UserContext.js";
import { CheckCircle } from "@phosphor-icons/react";
import { BotaoCustom } from "../../styled.js";
import { useRequest } from "../../hooks/request.hooks.js";
import { CarregamentoModal, ErroModal } from "../../components/Modal.js";
import { ConfirmacaoMain, ConfirmacaoPedidoConfirmado } from "./styled.js";
import ResumoPedido from "../../components/ResumoPedido.js";

export default function Confirmacao() {
  const { user } = useContext(UserContext);
  const { idPedido } = useParams();

  const buscarDadosPedido = useCallback(async () => {
    try {
      return await getPedido({ idPedido, token: user.token });
    } catch (err) {
      if (err.response?.data) throw Error(err.response.data);
      throw Error(err.message);
    }
  }, [user?.token, idPedido]);

  const { loading, error, data: pedido } = useRequest(buscarDadosPedido);

  return (
    <ConfirmacaoMain>
      <CarregamentoModal mostrar={loading} />
      <ErroModal mostrar={error !== null}>{error?.message}</ErroModal>
      <ConfirmacaoPedidoConfirmado>
        <CheckCircle color="#A3E635" weight="fill" size={32} />{" "}
        <h1>Pedido confirmado!</h1>
      </ConfirmacaoPedidoConfirmado>

      {pedido && (
        <ResumoPedido produtos={pedido.produtos} criadoEm={pedido.criadoEm} />
      )}

      <Link to="/home">
        <BotaoCustom>Voltar ao início</BotaoCustom>
      </Link>
    </ConfirmacaoMain>
  );
}
