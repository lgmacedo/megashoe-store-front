function converterValorParaReais(valor) {
  valor = Number(valor);
  if (isNaN(valor)) {
    throw Error("'valor' deve ser um número!");
  }
  return `R$ ${valor
    .toFixed(2)
    .replace(".", ",")
    .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`;
}

export { converterValorParaReais };
