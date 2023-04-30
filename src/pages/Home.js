import Navegacao from "../components/Navegacao";
import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { converterValorParaReais } from "../utils/converterValorParaReais";
import { addItemCarrinho } from "../storage/carrinho.storage";
import { UserContext } from "../contexts/UserContext.js";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

export default function Home() {
  const [produtos, setProdutos] = useState([]);
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  useEffect(() => {
    const promise = api.get("/produtos");
    promise.then(produtosSuccess);
    promise.catch(produtosFailed);
  }, []);

  function produtosSuccess(res) {
    setProdutos(res.data);
  }

  function produtosFailed(err) {
    alert(err.message);
  }

  function addToCart(id) {
    const promise = api.get(`/produtos/checar/${id}`);
    promise.then(() => cartSuccess(id));
    promise.catch(cartFailed);
  }

  function cartSuccess(id) {
    addItemCarrinho(id);
    alert("Produto adicionado ao carrinho com sucesso");
  }

  function cartFailed(err) {
    alert(err.response.message);
  }

  return (
    <>
      <SaudacaoHome>
        <h1>Olá, {user?.nome}!</h1>
        <p>Do que precisa hoje?</p>
      </SaudacaoHome>
      <ProductsContainer>
        {produtos.map((p) => (
          <Product key={p._id}>
            <ProductInfo onClick={() => navigate(`/detalhes/${p._id}`)}>
              <img alt={p.nome} src={p.imagem} />
              <p>{p.nome}</p>
              <p>{converterValorParaReais(p.preco)}</p>
            </ProductInfo>
            <AddToCart onClick={() => addToCart(p._id)}>+ carrinho</AddToCart>
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
