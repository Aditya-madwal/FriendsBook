import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom"; // useNavigate = redirect
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";

const Form = (props) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [first_name, setFname] = useState("");
  const [last_name, setLname] = useState("");
  const [pfp, setPfp] = useState(null);
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    try {
      if (props.method === "login") {
        const res = await api.post(props.route, { username, password });
        localStorage.setItem(ACCESS_TOKEN, res.data.access);
        localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
        navigate("/");
      } else {
        const res = await api.post(props.route, {
          username,
          password,
          password2,
          email,
          first_name,
          last_name,
          pfp,
        });
        navigate("/login");
      }
    } catch (error) {
      alert(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form action="post" onSubmit={handleSubmit} className="form-container">
      {props.method == "login" ? (
        <div>
          <label htmlFor="username">Username :</label>
          <input
            type="text"
            name="username"
            id="username"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
          <label htmlFor="password">password :</label>
          <input
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
      ) : (
        <>
          <div>
            <label htmlFor="username">Username :</label>
            <input
              type="text"
              name="username"
              id="username"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
            <label htmlFor="first_name">first name :</label>
            <input
              type="text"
              name="first_name"
              id="first_name"
              value={first_name}
              onChange={(e) => {
                setFname(e.target.value);
              }}
            />
            <label htmlFor="last_name">last name :</label>
            <input
              type="text"
              name="last_name"
              id="last_name"
              value={last_name}
              onChange={(e) => {
                setLname(e.target.value);
              }}
            />
            <label htmlFor="email">email :</label>
            <input
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <label htmlFor="password">password :</label>
            <input
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <label htmlFor="password2">confirm password :</label>
            <input
              type="password"
              name="password2"
              id="password2"
              value={password2}
              onChange={(e) => {
                setPassword2(e.target.value);
              }}
            />
          </div>
        </>
      )}
      <button type="submit">
        {props.method === "login" ? "Login" : "Register"}
      </button>
    </form>
  );
};

export default Form;
