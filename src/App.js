import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register"
import LoginPage from "./pages/LoginPage";
import ProtectedRoutes from "./utils/ProtectedRoutes";
import PageNotFound from "./pages/PageNotFound";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/home" element={<ProtectedRoutes Component={Home} redirectTo="/home" />} />
        <Route path="/signup" element={<ProtectedRoutes Component={Register} redirectTo="/home" publicRoute={true} />}/>
        <Route path="/" element={<ProtectedRoutes Component={LoginPage} redirectTo="/home" publicRoute={true} /> }/>
        <Route path="/*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default App;
