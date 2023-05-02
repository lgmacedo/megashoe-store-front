import styled from "styled-components";

const BotaoCustom = styled.button`
  background-color: #a3e635;
  font-family: inherit;
  border: none;
  border-radius: 12px;
  height: 45px;
  width: 100%;
  color: #171717;
  font-size: 18px;
  font-weight: 500;
  cursor: pointer;

  transition: background-color ease 0.3s;

  &:hover {
    background-color: #bef264;
  }

  &:active {
    background-color: #a3e635;
  }

  &:disabled {
    opacity: 0.25;
    cursor: auto;
    background-color: #a3e635;
  }
`;

export { BotaoCustom };
