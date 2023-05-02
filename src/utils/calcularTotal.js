function calcularTotal(produtos) {
  return produtos?.reduce((prev, curr) => {
    return prev + curr.quantidadeSelecionada * curr.preco;
  }, 0);
}

export { calcularTotal };
