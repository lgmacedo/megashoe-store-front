import styled from "styled-components";

const CarrinhoMain = styled.main`
  padding: 32px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 75px);
  hr {
    border: none;
    height: 1px;
    background: #404040;
    margin: 32px 0;
  }

  max-width: 600px;
  margin: 0 auto;
`;

const CarrinhoMainTotal = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 12px;
  font-size: 20px;
  width: 100%;
  margin-bottom: 32px;

  strong:last-child {
    color: #a3e635;
    font-weight: 600;
  }
`;

export { CarrinhoMain, CarrinhoMainTotal };
