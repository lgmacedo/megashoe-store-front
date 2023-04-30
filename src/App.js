import { BrowserRouter } from "react-router-dom";
import UserProvider from "./contexts/UserContext";
import MyRoutes from "./routes.js";

function App() {
  return (
    <div className="App">
      <UserProvider>
        <BrowserRouter>
          <MyRoutes />
        </BrowserRouter>
      </UserProvider>
    </div>
  );
}

export default App;
