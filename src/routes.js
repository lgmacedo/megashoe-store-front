import { Navigate, Route, Routes } from "react-router-dom";
import Carrinho from "./pages/Carrinho";
import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";
import Confirmacao from "./pages/Confirmacao";
import Detalhes from "./pages/Detalhes";
import Home from "./pages/Home";
import User from "./pages/User";
import { useContext } from "react";
import { UserContext } from "./contexts/UserContext.js";

export default function MyRoutes() {
  const { user } = useContext(UserContext);
  const autenticado = user !== null;

  return (
    <Routes>
      <Route
        path="/"
        element={autenticado ? <Navigate to="/home" /> : <Login />}
      />
      <Route
        path="/cadastro"
        element={autenticado ? <Navigate to="/home" /> : <Cadastro />}
      />
      <Route
        path="/carrinho"
        element={autenticado ? <Carrinho /> : <Navigate to="/" />}
      />
      <Route
        path="/confirmacao/:idPedido"
        element={autenticado ? <Confirmacao /> : <Navigate to="/" />}
      />
      <Route
        path="/detalhes/:idProduto"
        element={autenticado ? <Detalhes /> : <Navigate to="/" />}
      />
      <Route
        path="/home"
        element={autenticado ? <Home /> : <Navigate to="/" />}
      />
      <Route
        path="/user"
        element={autenticado ? <User /> : <Navigate to="/" />}
      />
    </Routes>
  );
}
