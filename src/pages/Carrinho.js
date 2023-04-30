import styled from "styled-components";
import { useContext, useEffect, useState } from "react";
import Navegacao from "../components/Navegacao.js";
import { BotaoCustom } from "../styled.js";
import { converterValorParaReais } from "../utils/converterValorParaReais.js";
import { buscarProdutosCarrinho } from "../services/carrinho.services.js";
import CarrinhoLista from "../components/CarrinhoLista.js";
import { getItensCarrinho } from "../storage/carrinho.storage.js";
import { criarPedido } from "../services/pedido.services.js";
import { UserContext } from "../contexts/UserContext.js";
import { limparCarrinho } from "../storage/carrinho.storage.js";
import { useNavigate } from "react-router-dom";
import { calcularTotal } from "../utils/calcularTotal.js";

export default function Carrinho() {
  const [produtos, setProdutos] = useState([]);
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    buscarProdutosCarrinho(getItensCarrinho()).then((produtos) =>
      setProdutos(produtos)
    );
  }, []);

  const valorTotal = calcularTotal(produtos);

  function handleComprar() {
    const produtosComprados = produtos.map((p) => ({
      idProduto: p._id,
      quantidadeSelecionada: p.quantidadeSelecionada,
    }));

    criarPedido({ produtos: produtosComprados, token: user.token })
      .then((idPedido) => {
        limparCarrinho();
        navigate(`/confirmacao/${idPedido}`);
      })
      .catch((err) => alert(err.message));
  }

  return (
    <>
      <CarrinhoMain>
        {produtos.length === 0 ? (
          "Seu carrinho está vazio!"
        ) : (
          <CarrinhoLista produtos={produtos} setProdutos={setProdutos} />
        )}
        <hr />
        <CarrinhoMainTotal>
          <strong>Total:</strong>
          <strong>{converterValorParaReais(valorTotal)}</strong>
        </CarrinhoMainTotal>
        <BotaoCustom disabled={produtos.length === 0} onClick={handleComprar}>
          Comprar
        </BotaoCustom>
      </CarrinhoMain>
      <Navegacao index={2} />
    </>
  );
}

const CarrinhoMain = styled.main`
  padding: 32px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: calc(100vh - 75px);
  hr {
    border: none;
    height: 1px;
    background: #404040;
    margin: 32px 0;
  }
`;

const CarrinhoMainTotal = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 12px;
  font-size: 20px;
  width: 100%;
  margin-bottom: 32px;

  strong:last-child {
    color: #a3e635;
    font-weight: 600;
  }
`;
