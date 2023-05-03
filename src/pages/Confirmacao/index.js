import { useCallback, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import {
  buscarProdutosPedido,
  getPedido,
} from "../../services/pedido.services.js";
import { UserContext } from "../../contexts/UserContext.js";
import { converterValorParaReais } from "../../utils/converterValorParaReais.js";
import { CheckCircle } from "@phosphor-icons/react";
import { BotaoCustom } from "../../styled.js";
import ItemPedido from "../../components/ItemPedido.js";
import { calcularTotal } from "../../utils/calcularTotal.js";
import { converterTimestamp } from "../../utils/converterTimestamp.js";
import { useRequest } from "../../hooks/request.hooks.js";
import { CarregamentoModal, ErroModal } from "../../components/Modal.js";
import {
  ConfirmacaoMain,
  ConfirmacaoPedidoConfirmado,
  ConfirmacaoPedidoInfo,
} from "./styled.js";

export default function Confirmacao() {
  const { user } = useContext(UserContext);
  const { idPedido } = useParams();

  const buscarDadosPedido = useCallback(async () => {
    try {
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
