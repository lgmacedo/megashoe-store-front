import { useParams, useNavigate } from "react-router-dom";
import { converterValorParaReais } from "../../utils/converterValorParaReais";
import { ArrowCircleLeft } from "@phosphor-icons/react";
import { addItemCarrinho } from "../../storage/carrinho.storage";
import { BotaoCustom } from "../../styled.js";
import apiClient from "../../services/api.client.js";
import { useMutation, useRequest } from "../../hooks/request.hooks.js";
import {
  CarregamentoModal,
  ErroModal,
  SucessoModal,
} from "../../components/Modal.js";
import { useCallback } from "react";
import { ProductDetailsContainer } from "./styled.js";

export default function Detalhes() {
  const navigate = useNavigate();
  const { idProduto } = useParams();

  const buscarProduto = useCallback(async () => {
    try {
      const res = await apiClient.get(`/produtos/${idProduto}`);
      return res.data;
    } catch (err) {
      if (err.response?.data) throw Error(err.response.data);
      throw Error(err.message);
    }
  }, [idProduto]);

  const {
    loading: loadingProduto,
    error: errorProduto,
    data: produto,
  } = useRequest(buscarProduto);

  const {
    loading: loadingCarrinho,
    error: errorCarrinho,
    mutate: adicionarItemNoCarrinho,
    data: respostaCarrinho,
  } = useMutation(addToCart);

  async function addToCart(id) {
    try {
      const res = await apiClient.get(`/produtos/checar/${id}`);
      addItemCarrinho(id);
      return res;
    } catch (err) {
      throw Error(err.response?.data ?? err.message);
    }
  }

  return (
    <>
      <ErroModal mostrar={errorCarrinho !== null || errorProduto !== null}>
        {errorCarrinho?.message || errorProduto?.message}
      </ErroModal>
      <SucessoModal mostrar={respostaCarrinho !== null}>
        Item adicionado ao carrinho!
      </SucessoModal>
      <CarregamentoModal mostrar={loadingProduto || loadingCarrinho} />
      {produto && (
        <ProductDetailsContainer>
          <img alt={produto.nome} src={produto.imagem} />
          <p>{produto.nome}</p>
          <p>{converterValorParaReais(produto.preco)}</p>
          <BotaoCustom onClick={() => adicionarItemNoCarrinho(produto._id)}>
            + carrinho
          </BotaoCustom>
          <p>Mais detalhes</p>
          <p>{produto.descricao}</p>
          <ArrowCircleLeft
            onClick={() => navigate("/home")}
            size={64}
            color="#404040"
            weight="duotone"
          />
        </ProductDetailsContainer>
      )}
    </>
  );
}
