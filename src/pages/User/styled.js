import styled from "styled-components";

const UserMain = styled.main`
  padding: 32px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 75px);
  gap: 32px;

  h1 {
    font-size: 24px;
    font-weight: bold;
  }
`;

export { UserMain };
