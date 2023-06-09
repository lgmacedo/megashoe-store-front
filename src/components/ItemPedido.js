import styled from "styled-components";
import { converterValorParaReais } from "../utils/converterValorParaReais.js";

export default function ItemPedido({
  imagem,
  nome,
  preco,
  quantidadeSelecionada,
}) {
  return (
    <StyledPedidoItem>
      <img src={imagem} alt={nome} />
      <StyledPedidoItemInformacoes>
        <div>
          <p>{nome}</p>
          <p>{converterValorParaReais(preco)}</p>
          <p>x{quantidadeSelecionada}</p>
        </div>
      </StyledPedidoItemInformacoes>
    </StyledPedidoItem>
  );
}

const StyledPedidoItem = styled.div`
  background: #404040;
  height: 118px;
  width: 100%;
  border-radius: 12px;
  overflow: hidden;
  display: flex;

  p {
    font-size: 16px;
  }

  img {
    height: 100%;
    width: 136px;
    object-fit: cover;
  }
`;

const StyledPedidoItemInformacoes = styled.div`
  flex: 1;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 16px;

  div:first-child {
    display: flex;
    flex-direction: column;
    gap: 8px;
    text-align: center;
  }

  div:last-child {
    display: flex;
    align-items: center;
    gap: 10px;

    button {
      width: 24px;
      height: 24px;
      background: #fafafa;
      border: none;
      border-radius: 100%;
      font-size: 14px;
      font-weight: bold;
      color: #171717;
      cursor: pointer;

      transition: transform ease 0.25s;
      will-change: auto;
      &:active {
        transform: scale(0.9);
      }
    }
  }
`;
