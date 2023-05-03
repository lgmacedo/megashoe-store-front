import styled from "styled-components";

const UserMain = styled.main`
  padding: 32px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: stretch;
  min-height: calc(100vh - 75px);
  gap: 32px;

  padding-bottom: calc(75px + 32px);

  h1 {
    font-size: 24px;
    font-weight: bold;
  }

  ul {
    width: 100%;
  }

  & > div + div {
    border-top: 1px solid #323232;
    padding-top: 32px;
  }

  h2 {
    font-weight: bold;
  }
`;

export { UserMain };
