import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import styled from "styled-components";
import { converterValorParaReais } from "../utils/converterValorParaReais";
import { ArrowCircleLeft } from "@phosphor-icons/react";
import { addItemCarrinho } from "../storage/carrinho.storage";

export default function Detalhes() {
  const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
  });

  const [produto, setProduto] = useState({ preco: 0 });

  const navigate = useNavigate();

  const { idProduto } = useParams();
  console.log(idProduto);

  useEffect(() => {
    const promise = api.get(`/detalhes/${idProduto}`);
    promise.then(produtoSuccess);
    promise.catch(produtoFailed);
  }, []);

  function produtoSuccess(res) {
    setProduto(res.data);
  }

  function produtoFailed(err) {
    alert(err.response.message);
    navigate("/home");
  }

  function addToCart(id){
    const promise = api.post("/pedidos", {id});
    promise.then(cartSuccess);
    promise.catch(cartFailed);
  }

  function cartSuccess(res){
    addItemCarrinho(produto._id);
    alert("Produto adicionado ao carrinho com sucesso");
  }

  function cartFailed(err){
    alert(err.response.message);
  }

  return (
    <ProductDetailsContainer>
      <img alt="product-picture" src={produto.imagem} />
      <p>{produto.nome}</p>
      <p>{converterValorParaReais(produto.preco)}</p>
      <button onClick={()=>addToCart(produto._id)}>+ carrinho</button>
      <p>Mais detalhes</p>
      <p>{produto.descricao}</p>
      <ArrowCircleLeft onClick={()=>navigate("/home")} size={50} color="#A3E635" weight="duotone" />
    </ProductDetailsContainer>
  );
}

const ProductDetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 32px;
  position: relative;
  img {
    margin-bottom: 41px;
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
    width: 326px;
    height: 45px;
    background: #a3e635;
    border-radius: 12px;
    border: 0px;
    font-weight: 500;
    font-size: 18px;
    line-height: 22px;
    color: #171717;
    cursor: pointer;
    margin-bottom: 41px;
    font-family: "Lexend Deca";
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
  svg{
    position: absolute;
    cursor: pointer;
  }
`;
