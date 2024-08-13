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
import ChatLanding from "./pages/ChatLanding";

// export const Logout = () => {
//   const { me, setMe } = useContext(MyContext);
//   localStorage.clear();
//   setMe(null);
//   return <Navigate to="/register" />;
// };

const RegisterAndLogout = () => {
  if (localStorage.getItem(ACCESS_TOKEN) == null) {
    localStorage.clear();
    return <Register />;
  } else {
    return (
      <div className="flex justify-center items-center h-screen w-screen">
        {/* already logged in :
        <button
          className="btn underline"
          onClick={() => {
            Logout();
          }}>
          <Link to="/login">Logout</Link>
        </button> */}
        <div
          className="rounded-2xl border border-blue-100 bg-white p-4 shadow-lg sm:p-6 lg:p-8 w-fit"
          role="alert">
          <div className="flex items-center gap-4">
            <span className="shrink-0 rounded-full bg-red-200 p-2 text-red-500">
              <svg
                className="h-4 w-4"
                fill="currentColor"
                viewbox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  clipRule="evenodd"
                  d="M18 3a1 1 0 00-1.447-.894L8.763 6H5a3 3 0 000 6h.28l1.771 5.316A1 1 0 008 18h1a1 1 0 001-1v-4.382l6.553 3.276A1 1 0 0018 15V3z"
                  fillRule="evenodd"
                />
              </svg>
            </span>

            <p className="font-medium sm:text-lg">
              You are already Logged In !
            </p>
          </div>

          <button className="mt-4 text-gray-500">
            Are you sure to logout ?
          </button>

          <div className="mt-6 sm:flex sm:gap-4">
            <button
              className="inline-block w-full rounded-lg bg-red-200 px-5 py-3 text-center text-sm font-semibold text-red-500 sm:w-auto"
              onClick={() => {
                localStorage.clear();
                return <Navigate to="/register" />;
              }}>
              Logout
            </button>

            <Link
              className="mt-2 inline-block w-full rounded-lg bg-gray-50 px-5 py-3 text-center text-sm font-semibold text-gray-500 sm:mt-0 sm:w-auto"
              to="/">
              Cancel, Return to Home
            </Link>
          </div>
        </div>
      </div>
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
        <Route
          path="/chat/:connection_uid"
          element={
            <AuthRequiringRoutes>
              <ChatLanding />
            </AuthRequiringRoutes>
          }
        />
        <Route
          path="/chat"
          element={
            <AuthRequiringRoutes>
              <ChatLanding />
            </AuthRequiringRoutes>
          }
        />
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
