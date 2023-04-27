import styled from "styled-components";

const BotaoCustom = styled.button`
  background: #a3e635;
  font-family: inherit;
  border: none;
  border-radius: 12px;
  height: 45px;
  width: 100%;
  color: #171717;
  font-size: 18px;
  font-weight: 500;

  &:disabled {
    opacity: 0.25;
  }
`;

export { BotaoCustom };
