function converterTimestamp(timestamp) {
  return new Date(timestamp).toLocaleDateString({
    language: "pt-br",
  });
}

export { converterTimestamp };
