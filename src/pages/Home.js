import Navegacao from "../components/Navegacao";
import { useContext } from "react";
import styled from "styled-components";
import apiClient from "../services/api.client.js";
import { useNavigate } from "react-router-dom";
import { converterValorParaReais } from "../utils/converterValorParaReais";
import { addItemCarrinho } from "../storage/carrinho.storage";
import { UserContext } from "../contexts/UserContext.js";
import { useMutation, useRequest } from "../hooks/request.hooks.js";
import {
  ErroModal,
  SucessoModal,
  CarregamentoModal,
} from "../components/Modal.js";

async function buscarProdutos() {
  try {
    return (await apiClient.get("/produtos")).data;
  } catch (err) {
    throw Error(err.response?.data ?? err.message);
  }
}

async function addToCart(id) {
  try {
    const res = await apiClient.get(`/produtos/checar/${id}`);
    addItemCarrinho(id);
    return res;
  } catch (err) {
    throw Error(err.response?.data ?? err.message);
  }
}

export default function Home() {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const {
    loading: loadingProdutos,
    error: errorProdutos,
    data: produtos,
  } = useRequest(buscarProdutos);

  const {
    loading: loadingCart,
    error: errorCarrinho,
    mutate: adicionarItemNoCarrinho,
    data: respostaCarrinho,
  } = useMutation(addToCart);

  if (errorProdutos) {
    alert(errorProdutos.message);
  }

  return (
    <>
      <ErroModal mostrar={errorCarrinho !== null}>
        Algo deu errado, tente novamente
      </ErroModal>
      <SucessoModal mostrar={respostaCarrinho !== null}>
        Item adicionado ao carrinho
      </SucessoModal>
      <CarregamentoModal mostrar={loadingProdutos || loadingCart} />
      <SaudacaoHome>
        <h1>Olá, {user?.nome}!</h1>
        <p>Do que precisa hoje?</p>
      </SaudacaoHome>
      <ProductsContainer>
        {produtos?.map((p) => (
          <Product key={p._id}>
            <ProductInfo onClick={() => navigate(`/detalhes/${p._id}`)}>
              <img alt={p.nome} src={p.imagem} />
              <p>{p.nome}</p>
              <p>{converterValorParaReais(p.preco)}</p>
            </ProductInfo>
            <AddToCart onClick={() => adicionarItemNoCarrinho(p._id)}>
              + carrinho
            </AddToCart>
          </Product>
        ))}
      </ProductsContainer>
      <Navegacao index={0} />
    </>
  );
}

const SaudacaoHome = styled.div`
  padding: 32px 32px 0 32px;
  display: flex;
  flex-direction: column;
  gap: 8px;

  h1 {
    font-size: 24px;
    font-weight: bold;
  }

  p {
    font-size: 16px;
    color: #a3a3a3;
  }
`;

const ProductsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  column-gap: 16px;
  row-gap: 24px;
  padding: 44px 32px;
  margin-bottom: 74px;
`;

const Product = styled.div`
  flex: 1 1 150px;
  height: 240px;
  background-color: #404040;
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
`;

const ProductInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  font-size: 16px;
  line-height: 20px;
  height: 202.11px;
  img {
    width: 100%;
    height: 110px;
    object-fit: cover;
    margin-bottom: auto;
  }
  p:nth-child(2) {
    color: #fafafa;
    font-weight: 500;
    margin-bottom: 15.55px;
  }
  p:nth-child(3) {
    color: #d2cfcf;
    font-weight: 600;
    margin-bottom: 24.3px;
  }
`;

const AddToCart = styled.div`
  height: 37.89px;
  background-color: #a3e635;
  border-radius: 0px 0px 12px 12px;
  color: black;
  font-weight: 600;
  font-size: 16px;
  line-height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
