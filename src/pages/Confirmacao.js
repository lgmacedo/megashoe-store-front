import { useContext, useEffect, useState } from "react";
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

export default function Confirmacao() {
  const { user } = useContext(UserContext);
  const { idPedido } = useParams();
  const [pedido, setPedido] = useState();
  const [produtos, setProdutos] = useState();

  useEffect(() => {
    if (!idPedido || !user?.token) return;
    getPedido({ idPedido, token: user.token })
      .then(setPedido)
      .catch((err) => console.log(err));
  }, [user.token, idPedido]);

  useEffect(() => {
    if (!pedido) return;
    buscarProdutosPedido(pedido.produtos).then((produtos) =>
      setProdutos(produtos)
    );
  }, [pedido]);

  const total = calcularTotal(produtos) ?? 0;
  return (
    <ConfirmacaoMain>
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
