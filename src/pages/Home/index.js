import Navegacao from "../../components/Navegacao";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { addItemCarrinho } from "../../storage/carrinho.storage";
import { UserContext } from "../../contexts/UserContext.js";
import { useMutation, useRequest } from "../../hooks/request.hooks.js";
import {
  ErroModal,
  SucessoModal,
  CarregamentoModal,
} from "../../components/Modal.js";
import { buscarProdutos } from "../../services/produto.services.js";
import { checarDisponibilidade } from "../../services/carrinho.services.js";
import { ProductsContainer, SaudacaoHome } from "./styled.js";
import ItemProduto from "../../components/ItemProduto.js";

async function addToCart(id) {
  try {
    const res = await checarDisponibilidade(id);
    addItemCarrinho(id);
    return res;
  } catch (err) {
    throw Error(err.response?.data ?? err.message);
  }
}

export default function Home() {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  const {
    loading: loadingProdutos,
    error: errorProdutos,
    data: produtos,
  } = useRequest(buscarProdutos);

  const {
    loading: loadingCart,
    error: errorCarrinho,
    mutate: adicionarItemNoCarrinho,
    data: respostaCarrinho,
  } = useMutation(addToCart);

  if (errorProdutos) {
    alert(errorProdutos.message);
  }

  return (
    <>
      <ErroModal mostrar={errorCarrinho !== null}>
        Algo deu errado, tente novamente
      </ErroModal>
      <SucessoModal mostrar={respostaCarrinho !== null}>
        Item adicionado ao carrinho
      </SucessoModal>
      <CarregamentoModal mostrar={loadingProdutos || loadingCart} />
      <SaudacaoHome>
        <h1>Olá, {user?.nome}!</h1>
        <p>Do que precisa hoje?</p>
      </SaudacaoHome>
      <ProductsContainer>
        {produtos?.map((p) => (
          <ItemProduto
            key={p._id}
            nome={p.nome}
            preco={p.preco}
            imagem={p.imagem}
            goDetalhes={() => navigate(`/detalhes/${p._id}`)}
            addCarrinho={() => adicionarItemNoCarrinho(p._id)}
          />
        ))}
      </ProductsContainer>
      <Navegacao index={0} />
    </>
  );
}
