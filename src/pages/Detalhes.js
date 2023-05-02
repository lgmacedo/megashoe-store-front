import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { converterValorParaReais } from "../utils/converterValorParaReais";
import { ArrowCircleLeft } from "@phosphor-icons/react";
import { addItemCarrinho } from "../storage/carrinho.storage";
import { BotaoCustom } from "../styled.js";
import apiClient from "../services/api.client.js";
import { useMutation, useRequest } from "../hooks/request.hooks.js";
import {
  CarregamentoModal,
  ErroModal,
  SucessoModal,
} from "../components/Modal.js";
import { useCallback } from "react";

export default function Detalhes() {
  const navigate = useNavigate();
  const { idProduto } = useParams();

  const buscarProduto = useCallback(async () => {
    try {
      const res = await apiClient.get(`/produtos/${idProduto}`);
      return res.data;
    } catch (err) {
      if (err.response?.data) throw Error(err.response.data);
      throw Error(err.message);
    }
  }, [idProduto]);

  const {
    loading: loadingProduto,
    error: errorProduto,
    data: produto,
  } = useRequest(buscarProduto);

  const {
    loading: loadingCarrinho,
    error: errorCarrinho,
    mutate: adicionarItemNoCarrinho,
    data: respostaCarrinho,
  } = useMutation(addToCart);

  async function addToCart(id) {
    try {
      const res = await apiClient.get(`/produtos/checar/${id}`);
      addItemCarrinho(id);
      return res;
    } catch (err) {
      throw Error(err.response?.data ?? err.message);
    }
  }

  return (
    <>
      <ErroModal mostrar={errorCarrinho !== null || errorProduto !== null}>
        {errorCarrinho?.message || errorProduto?.message}
      </ErroModal>
      <SucessoModal mostrar={respostaCarrinho !== null}>
        Item adicionado ao carrinho!
      </SucessoModal>
      <CarregamentoModal mostrar={loadingProduto || loadingCarrinho} />
      {produto && (
        <ProductDetailsContainer>
          <img alt={produto.nome} src={produto.imagem} />
          <p>{produto.nome}</p>
          <p>{converterValorParaReais(produto.preco)}</p>
          <BotaoCustom onClick={() => adicionarItemNoCarrinho(produto._id)}>
            + carrinho
          </BotaoCustom>
          <p>Mais detalhes</p>
          <p>{produto.descricao}</p>
          <ArrowCircleLeft
            onClick={() => navigate("/home")}
            size={64}
            color="#404040"
            weight="duotone"
          />
        </ProductDetailsContainer>
      )}
    </>
  );
}

const ProductDetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;

  img {
    margin-bottom: 41px;
    width: 100%;
    height: 350px;
    object-fit: cover;
  }

  & > :not(img) {
    margin: 0 32px;
  }

  svg:last-of-type {
    margin-top: 24px;
  }

  p:nth-child(2) {
    font-weight: 600;
    font-size: 32px;
    line-height: 40px;
    color: #fafafa;
    margin-bottom: 8px;
  }
  p:nth-child(3) {
    font-weight: 600;
    font-size: 24px;
    line-height: 30px;
    color: #a3a3a3;
    margin-bottom: 41px;
  }
  button {
    width: calc(100% - 64px);
    margin-bottom: 41px;
  }
  p:nth-child(5) {
    margin-bottom: 12px;
    font-weight: 400;
    font-size: 16px;
    line-height: 20px;
    color: #fafafa;
  }
  p:nth-child(6) {
    font-weight: 400;
    font-size: 14px;
    line-height: 18px;
    color: #a3a3a3;
  }
  svg {
    position: absolute;
    cursor: pointer;
  }
`;
