import styled from "styled-components";
import { calcularTotal } from "../utils/calcularTotal.js";
import { converterTimestamp } from "../utils/converterTimestamp.js";
import { converterValorParaReais } from "../utils/converterValorParaReais.js";
import ItemPedido from "./ItemPedido.js";

export default function ResumoPedido({ produtos, criadoEm }) {
  return (
    <ResumoPedidoContainer>
      <ItensPedidoLista>
        {produtos?.map((item) => (
          <ItemPedido
            key={item._id}
            quantidadeSelecionada={item.quantidadeSelecionada}
            imagem={item.imagem}
            nome={item.nome}
            preco={item.preco}
          />
        ))}
      </ItensPedidoLista>
      <InformacoesPedido>
        <div>
          <p>Total:</p>
          <p>{converterValorParaReais(calcularTotal(produtos) ?? 0)}</p>
        </div>
        <div>
          <p>Data:</p>
          <p>{converterTimestamp(criadoEm)}</p>
        </div>
      </InformacoesPedido>
    </ResumoPedidoContainer>
  );
}

const ResumoPedidoContainer = styled.div`
  width: 100%;
`;

const InformacoesPedido = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 12px;
  div {
    display: flex;
    justify-content: space-between;
  }
`;

const ItensPedidoLista = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
  margin: 24px 0;
`;
