import { Route, Routes, BrowserRouter } from "react-router-dom";
import Login from "./Components/Login";
import Registrasi from "./Components/Registrasi";
import Dashboard from "./Components/Dashboard";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/registrasi" element={<Registrasi />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
