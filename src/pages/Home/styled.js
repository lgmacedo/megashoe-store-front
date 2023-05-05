import styled from "styled-components";

const SaudacaoHome = styled.div`
  padding: 32px 32px 0 32px;
  display: flex;
  flex-direction: column;
  gap: 8px;

  max-width: 1200px;
  margin: 0 auto;

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
  padding-bottom: calc(75px + 32px);

  max-width: 1200px;
  margin: 0 auto;
  margin-bottom: 74px;
`;

export { ProductsContainer, SaudacaoHome };
