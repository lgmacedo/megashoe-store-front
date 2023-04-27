import styled from "styled-components";
import { useEffect, useState } from "react";
import Navegacao from "../components/Navegacao.js";
import CarrinhoItem from "../components/CarrinhoItem.js";
import { BotaoCustom } from "../styled.js";
import { converterValorParaReais } from "../utils/converterValorParaReais.js";
import {
  addItemCarrinho,
  removerItemCarrinho,
  removerUmItemCarrinho,
} from "../storage/carrinho.storage.js";
import { buscarProdutosCarrinho } from "../services/carrinho.services.js";

export default function Carrinho() {
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    buscarProdutosCarrinho().then((produtos) => setProdutos(produtos));
  }, []);

  function handleIncrementar(idItem) {
    const item = produtos.find((item) => item._id === idItem);
    if (!item) return;
    item.quantidade++;
    setProdutos([...produtos]);
    addItemCarrinho(idItem);
  }

  function handleDecrementar(idItem) {
    const item = produtos.find((item) => item._id === idItem);
    if (!item) return;
    item.quantidade--;
    if (item.quantidade < 1) {
      item.quantidade = 1;
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

  const total = produtos.reduce(
    (prev, curr) => prev + curr.quantidade * curr.preco,
    0
  );

  return (
    <div>
      <CarrinhoMain>
        <ul>
          {produtos.map((item) => (
            <li key={item._id}>
              <CarrinhoItem
                quantidade={item.quantidade}
                imagem={item.imagem}
                titulo={item.titulo}
                preco={item.preco}
                incrementar={() => handleIncrementar(item._id)}
                decrementar={() => handleDecrementar(item._id)}
                deletar={() => handleDeletarItem(item._id)}
              />
            </li>
          ))}
        </ul>

        <hr />

        <CarrinhoMainTotal>
          <strong>Total:</strong>
          <strong>{converterValorParaReais(total)}</strong>
        </CarrinhoMainTotal>

        <BotaoCustom>Comprar</BotaoCustom>
      </CarrinhoMain>
      <Navegacao index={2} />
    </div>
  );
}

const CarrinhoMain = styled.main`
  padding: 32px;
  ul {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
  hr {
    border: none;
    height: 1px;
    background: #404040;
    margin: 32px 0;
  }
`;

const CarrinhoMainTotal = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  font-size: 24px;
  width: 100%;
  font-weight: 600;
  margin-bottom: 32px;

  strong:last-child {
    color: #a3e635;
  }
`;
