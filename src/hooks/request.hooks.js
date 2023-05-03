import { useCallback, useEffect, useState } from "react";

/**
 *
 * @param {Promise} -> função de busca (apenas get)
 * @returns {Object} -> estados de loading, error, data e função de refresh
 *
 * IMPORTANTE: sempre faz a busca na primeira vez
 */
function useRequest(promise) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const refresh = useCallback(() => {
    setData(null);
    setError(null);
    setLoading(true);
    promise()
      .then(setData)
      .catch(setError)
      .finally(() => setLoading(false));
  }, [promise]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return { loading, error, data, setData, refresh };
}

/**
 *
 * @param {Promise} -> função envia dados no body (post, put, etc)
 * @returns {Object} -> estados de loading, error, data e função de mutate (para refazer a requisição)
 *
 * IMPORTANTE: necessário chamar "mutate" para executá-la
 */
function useMutation(promise) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const mutate = useCallback(
    (props) => {
      setData(null);
      setError(null);
      setLoading(true);
      promise(props)
        .then(setData)
        .catch(setError)
        .finally(() => setLoading(false));
    },
    [promise]
  );

  return { loading, error, data, mutate };
}

export { useRequest, useMutation };
