import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register"
import LoginPage from "./pages/LoginPage";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </div>
  );
}

export default App;
