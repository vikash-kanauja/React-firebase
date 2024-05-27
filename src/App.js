import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register"
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
