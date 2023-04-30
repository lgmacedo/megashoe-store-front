import { useParams } from "react-router-dom";

export default function Confirmacao() {
  const { idPedido } = useParams();

  return <>{idPedido}</>;
}
