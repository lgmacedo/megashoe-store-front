import Navegacao from "../components/Navegacao";
import styled from "styled-components";

export default function Home() {
  return (
    <>
      <ProductsContainer>
        <Product>
          <ProductInfo>
            <img
              alt="product-picture"
              src="https://cdn-icons-png.flaticon.com/512/1785/1785340.png"
            />
            <p>Adidas Shoe</p>
            <p>R$ 2.000,00</p>
          </ProductInfo>
          <AddToCart>+ carrinho</AddToCart>
        </Product>
        <Product>
          <ProductInfo>
            <img
              alt="product-picture"
              src="https://www.pngmart.com/files/6/Shoe-PNG-Pic.png"
            />
            <p>Converse</p>
            <p>R$ 1.000,00</p>
          </ProductInfo>
          <AddToCart>+ carrinho</AddToCart>
        </Product>
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
    margin-bottom: 15.87px;
  }
  p:nth-child(2){
    color: #fafafa;
    font-weight: 500;
    margin-bottom: 15.55px;
  }
  p:nth-child(3){
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
