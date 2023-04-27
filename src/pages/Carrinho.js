import styled from "styled-components";
import Navegacao from "../components/Navegacao.js";
import CarrinhoItem from "../components/CarrinhoItem.js";
import { BotaoCustom } from "../styled.js";
import { converterValorParaReais } from "../utils/converterValorParaReais.js";
import { useState } from "react";

const KEY_CARRINHO = "carrinho";

function getItensCarrinho() {
  const itens = JSON.parse(localStorage.getItem(KEY_CARRINHO));
  return itens ?? [];
}

// function setItensCarrinho(itens) {
//   localStorage.setItem(KEY_CARRINHO, JSON.stringify(itens));
// }

export default function Carrinho() {
  const [itens, setItens] = useState(getItensCarrinho());

  function handleQuantidade(idItem, tipo) {
    const item = itens.find((item) => item.id === idItem);
    if (!item) return;
    if (tipo === "+") item.quantidade++;
    else if (tipo === "-") item.quantidade--;
    if (item.quantidade < 1) item.quantidade = 1;
    setItens([...itens]);
  }

  function handleDeletarItem(idItem) {}

  const total = itens.reduce(
    (prev, curr) => prev + curr.quantidade * curr.preco,
    0
  );

  return (
    <div>
      <CarrinhoMain>
        <ul>
          {itens.map((item) => (
            <li key={item.id}>
              <CarrinhoItem
                quantidade={item.quantidade}
                imagem={item.imagem}
                titulo={item.titulo}
                preco={item.preco}
                incrementar={() => handleQuantidade(item.id, "+")}
                decrementar={() => handleQuantidade(item.id, "-")}
                deletar={handleDeletarItem}
              />
            </li>
          ))}
        </ul>

        <hr />

        <CarrinhoMainTotal>
          <strong>Total:</strong>
          <strong>{converterValorParaReais(total)}</strong>
        </CarrinhoMainTotal>

        <BotaoCustom>Comprar</BotaoCustom>
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
  hr {
    border: none;
    height: 1px;
    background: #404040;
    margin: 32px 0;
  }
`;

const CarrinhoMainTotal = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  font-size: 24px;
  width: 100%;
  font-weight: 600;
  margin-bottom: 32px;

  strong:last-child {
    color: #a3e635;
  }
`;
