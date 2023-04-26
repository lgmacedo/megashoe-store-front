import styled from "styled-components";
import { House, User, ShoppingCartSimple } from "@phosphor-icons/react";

export default function Navegacao({ index = 0 }) {
  return (
    <StyledNavegacao index={index}>
      <House size={32} weight="fill" />
      <User size={32} weight="fill" />
      <ShoppingCartSimple size={32} weight="fill" />
    </StyledNavegacao>
  );
}

const StyledNavegacao = styled.footer`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 74px;
  background: #1e1e1e;
  border-top: 1px solid #2e2e2e;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 32px;
  color: rgba(250, 250, 250, 0.4);
  ${({ index }) => {
    return `
        svg:nth-of-type(${index + 1}) {
            color: #a3e635;
        }
    `;
  }};
`;
