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
        <div>
          <p>{nome}</p>
          <p>{converterValorParaReais(preco)}</p>
        </div>
      </ProductInfo>
      <AddToCart onClick={addCarrinho}>+ carrinho</AddToCart>
    </Product>
  );
}

const Product = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 1 150px;
  min-height: 210px;
  background-color: #404040;
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
`;

const ProductInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  flex: 1;
  gap: 16px;
  flex-wrap: wrap;

  img {
    width: min(90%, 180px);
    max-height: 130px;
    object-fit: cover;
  }
  div {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    p:nth-of-type(1) {
      color: #fafafa;
      font-weight: 500;
      margin-bottom: 15.55px;
    }
    p:nth-of-type(2) {
      color: #d2cfcf;
      font-weight: 600;
      margin-bottom: 24.3px;
    }
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
