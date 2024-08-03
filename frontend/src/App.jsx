import { useState } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Page404 from "./pages/Page404";
import AuthRequiringRoutes from "./components/Authrequired";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "./constants";

const Logout = () => {
  localStorage.clear();
  return <Navigate to="/login" />;
};

const RegisterAndLogout = () => {
  if (localStorage.getItem(ACCESS_TOKEN) == null) {
    localStorage.clear();
    return <Register />;
  } else {
    return (
      <>
        already logged in
        <button
          className="btn"
          onClick={() => {
            Logout();
          }}>
          <Link to="/login">Logout</Link>
        </button>
      </>
    );
  }
};

function App() {
  const [count, setCount] = useState(0);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <AuthRequiringRoutes>
              <Home />
            </AuthRequiringRoutes>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<RegisterAndLogout />} />
        <Route path="*" element={<Page404 />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
