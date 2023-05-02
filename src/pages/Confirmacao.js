import { useCallback, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import {
  buscarProdutosPedido,
  getPedido,
} from "../services/pedido.services.js";
import { UserContext } from "../contexts/UserContext.js";
import styled from "styled-components";
import { converterValorParaReais } from "../utils/converterValorParaReais.js";
import { CheckCircle } from "@phosphor-icons/react";
import { BotaoCustom } from "../styled.js";
import ItemPedido from "../components/ItemPedido.js";
import { calcularTotal } from "../utils/calcularTotal.js";
import { converterTimestamp } from "../utils/converterTimestamp.js";
import { useRequest } from "../hooks/request.hooks.js";
import { CarregamentoModal, ErroModal } from "../components/Modal.js";
import { wait } from "@testing-library/user-event/dist/utils/index.js";

export default function Confirmacao() {
  const { user } = useContext(UserContext);
  const { idPedido } = useParams();

  const buscarDadosPedido = useCallback(async () => {
    try {
      await wait(3000);
      const pedido = await getPedido({ idPedido, token: user.token });
      if (!pedido) throw Error("O pedido não foi encontrado");
      const produtos = await buscarProdutosPedido(pedido.produtos);
      return { pedido, produtos };
    } catch (err) {
      if (err.response?.data) throw Error(err.response.data);
      throw Error(err.message);
    }
  }, [user?.token, idPedido]);

  const { loading, error, data } = useRequest(buscarDadosPedido);

  const produtos = data?.produtos;
  const pedido = data?.pedido;

  const total = calcularTotal(produtos) ?? 0;
  return (
    <ConfirmacaoMain>
      <CarregamentoModal mostrar={loading} />
      <ErroModal mostrar={error !== null}>{error?.message}</ErroModal>
      <ConfirmacaoPedidoConfirmado>
        <CheckCircle color="#A3E635" weight="fill" size={32} />{" "}
        <h1>Pedido confirmado!</h1>
      </ConfirmacaoPedidoConfirmado>

      <ul>
        {produtos?.map((item) => (
          <ItemPedido
            key={item._id}
            quantidadeSelecionada={item.quantidadeSelecionada}
            imagem={item.imagem}
            nome={item.nome}
            preco={item.preco}
          />
        ))}
      </ul>

      <ConfirmacaoPedidoInfo>
        <div>
          <p>Total:</p>
          <p>{converterValorParaReais(total)}</p>
        </div>
        <div>
          <p>Data:</p>
          <p>{converterTimestamp(pedido?.criadoEm)}</p>
        </div>
      </ConfirmacaoPedidoInfo>
      <Link to="/home">
        <BotaoCustom>Voltar ao início</BotaoCustom>
      </Link>
    </ConfirmacaoMain>
  );
}

const ConfirmacaoMain = styled.main`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 32px;
  a {
    width: 100%;
    margin-top: 64px;
  }
  ul {
    display: flex;
    flex-direction: column;
    gap: 16px;
    width: 100%;
    margin: 24px 0;
  }
`;

const ConfirmacaoPedidoConfirmado = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  width: 100%;
  h1 {
    font-size: 24px;
    font-weight: 600;
  }
`;

const ConfirmacaoPedidoInfo = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 16px;
  div {
    display: flex;
    justify-content: space-between;
    font-size: 18px;
  }
`;
