import { BrowserRouter, Routes, Route } from "react-router-dom";
import Carrinho from "./pages/Carrinho.js";
import Login from "./pages/Login.js";
import Cadastro from "./pages/Cadastro.js";
import Confirmacao from "./pages/Confirmacao.js";
import Detalhes from "./pages/Detalhes.js";
import Home from "./pages/Home.js";
import User from "./pages/User.js";
import UserProvider from "./contexts/UserContext"

function App() {
  return (
    <div className="App">
      <UserProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/cadastro" element={<Cadastro />} />
            <Route path="/carrinho" element={<Carrinho />} />
            <Route path="/confirmacao" element={<Confirmacao />} />
            <Route path="/detalhes/:idProduto" element={<Detalhes />} />
            <Route path="/home" element={<Home />} />
            <Route path="/user" element={<User />} />
          </Routes>
        </BrowserRouter>
      </UserProvider>
    </div>
  );
}

export default App;
