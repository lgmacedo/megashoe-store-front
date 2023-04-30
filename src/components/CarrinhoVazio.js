import styled from "styled-components";
import CarrinhoVetor from "./CarrinhoVetor.js";

export default function CarrinhoVazio() {
  return (
    <StyledCarrinhoVazio>
      <CarrinhoVetor />
      <p>Seu carrinho está vazio</p>
    </StyledCarrinhoVazio>
  );
}

const StyledCarrinhoVazio = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  p {
    color: #a3a3a3;
  }
`;
