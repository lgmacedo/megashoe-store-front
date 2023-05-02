import { Navigate, Route, Routes } from "react-router-dom";
import Carrinho from "./pages/Carrinho.js";
import Login from "./pages/Login.js";
import Cadastro from "./pages/Cadastro.js";
import Confirmacao from "./pages/Confirmacao.js";
import Detalhes from "./pages/Detalhes.js";
import Home from "./pages/Home.js";
import User from "./pages/User.js";
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
