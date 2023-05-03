import styled from "styled-components";

const ConfirmacaoMain = styled.main`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 32px;

  max-width: 600px;
  margin: 0 auto;

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

export { ConfirmacaoMain, ConfirmacaoPedidoConfirmado };
