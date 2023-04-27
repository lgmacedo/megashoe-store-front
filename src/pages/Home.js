import Navegacao from "../components/Navegacao";
import { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { converterValorParaReais } from "../utils/converterValorParaReais";

export default function Home() {
  const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
  });

  const [produtos, setProdutos] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const promise = api.get("/produtos");
    promise.then(produtosSuccess);
    promise.catch(produtosFailed);
  }, []);

  function produtosSuccess(res) {
    setProdutos(res.data);
  }

  function produtosFailed(err) {
    alert(err.response.message);
  }

  function addToCart(id){
    const promise = api.post("/pedidos", {id});
    promise.then(cartSuccess);
    promise.catch(cartFailed);
  }

  function cartSuccess(res){
    alert("Produto adicionado ao carrinho com sucesso");
  }

  function cartFailed(err){
    alert(err.response.message);
  }

  return (
    <>
      <ProductsContainer>
        {produtos.map((p) => (
          <Product key={p._id}>
            <ProductInfo onClick={()=>navigate(`/detalhes/${p._id}`)}>
              <img
                alt="product-picture"
                src={p.imagem}
              />
              <p>{p.nome}</p>
              <p>{converterValorParaReais(p.preco)}</p>
            </ProductInfo>
            <AddToCart onClick={()=>addToCart(p._id)}>+ carrinho</AddToCart>
          </Product>
        ))}
      </ProductsContainer>
      <Navegacao index={0} />
    </>
  );
}

const ProductsContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  column-gap: 16px;
  row-gap: 24px;
  padding: 44px 32px 44px 32px;
  margin-bottom: 74px;
`;

const Product = styled.div`
  width: 150px;
  height: 240px;
  background-color: #404040;
  border-radius: 12px;
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
    width: 110px;
    margin-bottom: 5px;
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
