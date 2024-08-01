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

  const handleImageChange = (e) => {
    setPfp(e.target.files[0]);
  };

  const refreshToken = async () => {
    const reftoken = localStorage.getItem(REFRESH_TOKEN);
    try {
      const res = await api.post("users/userapi/token/refresh/", {
        refresh: reftoken,
      });
      if (res.status === 200) {
        localStorage.setItem(ACCESS_TOKEN, String(res.data.access));
      } else {
      }
    } catch {}
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    try {
      if (props.method === "login") {
        const res = await api.post(props.route, { username, password });
        // localStorage.setItem(ACCESS_TOKEN, String(res.data.access));
        // console.log(res.data);
        localStorage.setItem(REFRESH_TOKEN, String(res.data.refresh));
        await refreshToken();
        navigate("/");
      } else {
        // register post :

        const formData = new FormData();
        formData.append("username", username);
        formData.append("first_name", first_name);
        formData.append("last_name", last_name);
        formData.append("email", email);
        formData.append("password", password);
        formData.append("password2", password2);
        formData.append("pfp", pfp);

        try {
          const response = await api.post(props.route, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
        } catch (error) {
          console.error("Error:", error);
          // Handle network or other errors
        }

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
            <input type="file" id="image" onChange={handleImageChange} />
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
