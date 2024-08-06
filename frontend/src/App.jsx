import { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Page404 from "./pages/Page404";
import Userdash from "./pages/Userdash";
import AuthRequiringRoutes from "./components/Authrequired";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "./constants";
import { useContext } from "react";
import { MyContext } from "./MyContext";
import api from "./api";
import SearchPage from "./pages/SearchPage";

export const Logout = () => {
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
        already logged in :
        <button
          className="btn underline"
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
  const { me, setMe } = useContext(MyContext);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMyData = async () => {
      try {
        const response = await api.get(`/api/showme`);
        setMe(response.data);
        console.log("me ------------>" + response.data.email);
      } catch (error) {
        if (error.response) {
          setError(
            `Error: ${error.response.status} - ${error.response.statusText}`
          );

          console.log("---------->" + error.response);
        } else if (error.request) {
          setError("Error: No response received from server");
          console.log("-------------->" + err);
        } else {
          setError(`Error: ${error.message}`);
        }
      } finally {
      }
    };
    fetchMyData();
  }, []);

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
        <Route
          path="/user/:username"
          element={
            <AuthRequiringRoutes>
              <Userdash />
            </AuthRequiringRoutes>
          }
        />
        {/* <Route
          path="/friendrequests"
          element={
            <AuthRequiringRoutes>
              <FriendRequests />
            </AuthRequiringRoutes>
          }
        /> */}
        <Route
          path="/search"
          element={
            <AuthRequiringRoutes>
              <SearchPage />
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
