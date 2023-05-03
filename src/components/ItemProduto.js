import styled from "styled-components";
import { converterValorParaReais } from "../utils/converterValorParaReais.js";

export default function ItemProduto({
  nome,
  imagem,
  preco,
  addCarrinho,
  goDetalhes,
}) {
  return (
    <Product>
      <ProductInfo onClick={goDetalhes}>
        <img alt={nome} src={imagem} />
        <p>{nome}</p>
        <p>{converterValorParaReais(preco)}</p>
      </ProductInfo>
      <AddToCart onClick={addCarrinho}>+ carrinho</AddToCart>
    </Product>
  );
}

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
    width: 80%;
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
