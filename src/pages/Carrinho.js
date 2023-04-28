import styled from "styled-components";
import { useEffect, useState } from "react";
import Navegacao from "../components/Navegacao.js";
import { BotaoCustom } from "../styled.js";
import { converterValorParaReais } from "../utils/converterValorParaReais.js";
import { buscarProdutosCarrinho } from "../services/carrinho.services.js";
import CarrinhoLista from "../components/CarrinhoLista.js";
import { getItensCarrinho } from "../storage/carrinho.storage.js";

export default function Carrinho() {
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    buscarProdutosCarrinho(getItensCarrinho()).then((produtos) =>
      setProdutos(produtos)
    );
  }, []);

  const valorTotal = produtos.reduce((prev, curr) => {
    return prev + curr.quantidadeSelecionada * curr.preco;
  }, 0);

  return (
    <>
      <CarrinhoMain>
        <CarrinhoLista produtos={produtos} setProdutos={setProdutos} />
        <hr />
        <CarrinhoMainTotal>
          <strong>Total:</strong>
          <strong>{converterValorParaReais(valorTotal)}</strong>
        </CarrinhoMainTotal>
        <BotaoCustom>Comprar</BotaoCustom>
      </CarrinhoMain>
      <Navegacao index={2} />
    </>
  );
}

const CarrinhoMain = styled.main`
  padding: 32px;
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
