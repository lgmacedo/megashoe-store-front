import styled from "styled-components";
import { useContext } from "react";
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
import CarrinhoVazio from "../components/CarrinhoVazio.js";
import { useMutation, useRequest } from "../hooks/request.hooks.js";
import { CarregamentoModal, ErroModal } from "../components/Modal.js";

async function buscarCarrinho() {
  try {
    return await buscarProdutosCarrinho(getItensCarrinho());
  } catch (err) {
    if (err.response?.data) throw Error(err.response.data);
    throw Error(err.message);
  }
}

export default function Carrinho() {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const {
    loading,
    error,
    data: produtos,
    setData: setProdutos,
  } = useRequest(buscarCarrinho);

  const {
    loading: loadingCompra,
    error: errorCompra,
    mutate: comprar,
  } = useMutation(handleComprar);

  const valorTotal = calcularTotal(produtos);

  async function handleComprar() {
    const produtosComprados = produtos.map((p) => ({
      idProduto: p._id,
      quantidadeSelecionada: p.quantidadeSelecionada,
    }));
    try {
      const idPedido = await criarPedido({
        produtos: produtosComprados,
        token: user.token,
      });
      limparCarrinho();
      navigate(`/confirmacao/${idPedido}`);
    } catch (err) {
      if (err.response?.data) throw Error(err.response.data);
      throw Error(err.message);
    }
  }

  return (
    <>
      <CarrinhoMain>
        <ErroModal mostrar={error || errorCompra}>
          {error?.message || errorCompra?.message}
        </ErroModal>
        <CarregamentoModal mostrar={loading || loadingCompra} />
        {!produtos?.length ? (
          <CarrinhoVazio />
        ) : (
          <>
            <CarrinhoLista produtos={produtos} setProdutos={setProdutos} />
            <hr />
            <CarrinhoMainTotal>
              <strong>Total:</strong>
              <strong>{converterValorParaReais(valorTotal)}</strong>
            </CarrinhoMainTotal>
            <BotaoCustom disabled={produtos.length === 0} onClick={comprar}>
              Comprar
            </BotaoCustom>
          </>
        )}
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
  align-items: center;
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
