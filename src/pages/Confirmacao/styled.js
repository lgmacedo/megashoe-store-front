import styled from "styled-components";

const ConfirmacaoMain = styled.main`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 32px;
  a {
    width: 100%;
    margin-top: 64px;
  }
  ul {
    display: flex;
    flex-direction: column;
    gap: 16px;
    width: 100%;
    margin: 24px 0;
  }
`;

const ConfirmacaoPedidoConfirmado = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  width: 100%;
  h1 {
    font-size: 24px;
    font-weight: 600;
  }
`;

const ConfirmacaoPedidoInfo = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 16px;
  div {
    display: flex;
    justify-content: space-between;
    font-size: 18px;
  }
`;

export { ConfirmacaoMain, ConfirmacaoPedidoConfirmado, ConfirmacaoPedidoInfo };
