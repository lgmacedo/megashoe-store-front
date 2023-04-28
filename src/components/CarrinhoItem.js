import styled from "styled-components";
import { converterValorParaReais } from "../utils/converterValorParaReais.js";
import { Trash } from "@phosphor-icons/react";

export default function CarrinhoItem({
  imagem,
  titulo,
  preco,
  quantidadeSelecionada,
  incrementar,
  decrementar,
  deletar,
}) {
  return (
    <StyledCarrinhoItem>
      <img src={imagem} alt={titulo} />
      <StyledCarrinhoItemInformacoes>
        <div>
          <p>{titulo}</p>
          <p>{converterValorParaReais(preco)}</p>
        </div>
        <div>
          <button onClick={incrementar}>+</button>
          {quantidadeSelecionada}
          <button onClick={decrementar}>-</button>
        </div>
      </StyledCarrinhoItemInformacoes>
      <StyledCarrinhoItemDeletar onClick={deletar}>
        <Trash weight="fill" size={24} />
      </StyledCarrinhoItemDeletar>
    </StyledCarrinhoItem>
  );
}

const StyledCarrinhoItem = styled.div`
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

const StyledCarrinhoItemInformacoes = styled.div`
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

const StyledCarrinhoItemDeletar = styled.button`
  background: #1e1e1e;
  width: 46px;
  height: 100%;
  display: grid;
  place-content: center;
  border: none;
  color: inherit;
  cursor: pointer;

  &:active {
    svg {
      transform: scale(0.9);
      transition: transform ease 0.25s;
      will-change: auto;
    }
  }
`;
