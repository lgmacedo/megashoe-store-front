import styled from "styled-components";
import { Link } from "react-router-dom";
import { House, User, ShoppingCartSimple } from "@phosphor-icons/react";

export default function Navegacao({ index = 0 }) {
  return (
    <StyledNavegacao index={index}>
      <nav>
        <Link to="/home">
          <House size={32} weight="fill" />
        </Link>
        <Link to="/user">
          <User size={32} weight="fill" />
        </Link>
        <Link to="/carrinho">
          <ShoppingCartSimple size={32} weight="fill" />
        </Link>
      </nav>
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
  padding: 0 32px;

  nav {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 100%;

    a {
      color: rgba(250, 250, 250, 0.4);
      transition: transform ease 0.25s;
      &:hover {
        transform: scale(1.2);
      }
      &:active {
        transform: scale(1);
      }
    }

    ${({ index }) => {
      return `
        a:nth-of-type(${index + 1}) {
            color: #a3e635;
        }
    `;
    }};
  }
`;
