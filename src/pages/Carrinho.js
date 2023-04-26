import styled from "styled-components";
import Navegacao from "../components/Navegacao.js";
import CarrinhoItem from "../components/CarrinhoItem.js";

export default function Carrinho() {
  return (
    <div>
      <CarrinhoMain>
        <ul>
          <li>
            <CarrinhoItem
              imagem="https://60398.cdn.simplo7.net/static/60398/sku/masculino-tenis-qix-smash-1640638551971.jpg"
              titulo="Adidas Shoe"
              preco={4000}
            />
          </li>
        </ul>
      </CarrinhoMain>
      <Navegacao index={2} />
    </div>
  );
}

const CarrinhoMain = styled.main`
  padding: 32px;

  ul {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
`;
