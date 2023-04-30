import styled from "styled-components";
import {
  addItemCarrinho,
  removerItemCarrinho,
  removerUmItemCarrinho,
} from "../storage/carrinho.storage.js";
import CarrinhoItem from "./CarrinhoItem.js";

export default function CarrinhoLista({ produtos, setProdutos }) {
  function handleIncrementar(idItem) {
    const item = produtos.find((item) => item._id === idItem);
    if (!item) return;
    item.quantidadeSelecionada++;
    setProdutos([...produtos]);
    addItemCarrinho(idItem);
  }

  function handleDecrementar(idItem) {
    const item = produtos.find((item) => item._id === idItem);
    if (!item) return;
    item.quantidadeSelecionada--;
    if (item.quantidadeSelecionada < 1) {
      item.quantidadeSelecionada = 1;
      return;
    }
    setProdutos([...produtos]);
    removerUmItemCarrinho(idItem);
  }

  function handleDeletarItem(idItem) {
    const novosProdutos = produtos.filter((produto) => produto._id !== idItem);
    setProdutos([...novosProdutos]);
    removerItemCarrinho(idItem);
  }

  return (
    <StyledCarrinhoLista>
      {produtos.map((item) => (
        <li key={item._id}>
          <CarrinhoItem
            quantidadeSelecionada={item.quantidadeSelecionada}
            imagem={item.imagem}
            nome={item.nome}
            preco={item.preco}
            incrementar={() => handleIncrementar(item._id)}
            decrementar={() => handleDecrementar(item._id)}
            deletar={() => handleDeletarItem(item._id)}
          />
        </li>
      ))}
    </StyledCarrinhoLista>
  );
}

const StyledCarrinhoLista = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
`;
