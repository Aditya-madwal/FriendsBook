import { useState } from "react";
import api from "../api";
import { Link, useNavigate } from "react-router-dom"; // useNavigate = redirect
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import login_image from "../assets/login_image.jpg";
import Loading from "../components/Loading";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [first_name, setFname] = useState("");
  const [last_name, setLname] = useState("");
  const [pfp, setPfp] = useState(null);
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [bio, setBio] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    setPfp(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("username", username);
      formData.append("first_name", first_name);
      formData.append("last_name", last_name);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("password2", password2);
      formData.append("bio", bio);
      formData.append("pfp", pfp);

      try {
        const response = await api.post("users/register", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      } catch (error) {
        console.error("Error:", error);
        // Handle network or other errors
      }

      const res = await api.post("users/register", {
        username,
        password,
        password2,
        email,
        first_name,
        last_name,
        pfp,
      });
      navigate("/login");
    } catch (error) {
      alert(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-white">
      {loading ? <Loading /> : null}
      <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
        <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
          <div className="max-w-xl lg:max-w-3xl">
            <h1 className="mt-6 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
              Welcome to FriendsBook
            </h1>

            <p className="mt-4 leading-relaxed text-gray-500">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eligendi
              nam dolorum aliquam, quibusdam aperiam voluptatum.
            </p>

            <form
              action="post"
              className="mt-8 grid grid-cols-6 gap-6"
              onSubmit={handleSubmit}>
              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="FirstName"
                  className="block text-sm font-medium text-gray-700">
                  First Name
                </label>

                <input
                  type="text"
                  id="FirstName"
                  name="first_name"
                  className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                  value={first_name}
                  onChange={(e) => {
                    setFname(e.target.value);
                  }}
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="LastName"
                  className="block text-sm font-medium text-gray-700">
                  Last Name
                </label>

                <input
                  type="text"
                  id="LastName"
                  name="last_name"
                  className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                  value={last_name}
                  onChange={(e) => {
                    setLname(e.target.value);
                  }}
                />
              </div>

              <div className="col-span-6 mt-3">
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-gray-700">
                  {" "}
                  Username{" "}
                </label>

                <input
                  type="text"
                  id="username"
                  name="username"
                  className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                  }}
                />
              </div>

              <div className="col-span-6 mt-3">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700">
                  {" "}
                  Email{" "}
                </label>

                <input
                  type="email"
                  id="email"
                  name="email"
                  className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </div>
              <div className="col-span-6 mt-4">
                <div className="mx-auto max-w-full p-0 pl-0">
                  <label
                    htmlFor="example1"
                    className="mb-1 block text-sm font-medium text-gray-700">
                    Upload file
                  </label>
                  <input
                    id="pfp"
                    type="file"
                    className="block w-full text-sm file:mr-4 file:rounded-md file:border-0 file:bg-blue-500 file:py-2.5 file:px-4 file:text-sm file:font-semibold file:text-white hover:file:bg-primary-700 focus:outline-none disabled:pointer-events-none disabled:opacity-60 p-0 border-0"
                    onChange={handleImageChange}
                  />
                </div>
              </div>

              <div className="col-span-6">
                <label
                  htmlFor="bio"
                  className="block text-sm font-medium text-gray-700">
                  {" "}
                  Bio{" "}
                </label>

                <textarea
                  id="bio"
                  name="bio"
                  className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                  value={bio}
                  onChange={(e) => {
                    setBio(e.target.value);
                  }}
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="Password"
                  className="block text-sm font-medium text-gray-700">
                  {" "}
                  Password{" "}
                </label>

                <input
                  type="password"
                  id="Password"
                  name="password"
                  className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="PasswordConfirmation"
                  className="block text-sm font-medium text-gray-700">
                  Password Confirmation
                </label>

                <input
                  type="password"
                  id="PasswordConfirmation"
                  name="password_confirmation"
                  className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                  value={password2}
                  onChange={(e) => {
                    setPassword2(e.target.value);
                  }}
                />
              </div>

              <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
                <button className="inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500 mt-4">
                  Create an account
                </button>

                <p className="mt-4 text-sm text-gray-500 sm:mt-0">
                  Already have an account?
                  <Link to={"/login"} className="text-gray-700 underline">
                    Log in
                  </Link>
                  .
                </p>
              </div>
            </form>
          </div>
        </main>
        <aside className=" block h-16 lg:order-last lg:col-span-5 lg:h-full xl:col-span-6 sticky">
          <img
            alt=""
            src={login_image}
            className="absolute inset-0 h-full w-full object-cover"
          />
        </aside>
      </div>
    </section>
    // <form action="post" onSubmit={handleSubmit} className="form-container">
    //   <div>
    //     <label htmlFor="username">Username :</label>
    //     <input
    //       type="text"
    //       name="username"
    //       id="username"
    //       value={username}
    //       onChange={(e) => {
    //         setUsername(e.target.value);
    //       }}
    //     />
    //     <label htmlFor="first_name">first name :</label>
    //     <input
    //       type="text"
    //       name="first_name"
    //       id="first_name"
    //       value={first_name}
    //       onChange={(e) => {
    //         setFname(e.target.value);
    //       }}
    //     />
    //     <label htmlFor="last_name">last name :</label>
    //     <input
    //       type="text"
    //       name="last_name"
    //       id="last_name"
    //       value={last_name}
    //       onChange={(e) => {
    //         setLname(e.target.value);
    //       }}
    //     />
    //     <label htmlFor="email">email :</label>
    //     <input
    //       type="email"
    //       name="email"
    //       id="email"
    //       value={email}
    //       onChange={(e) => {
    //         setEmail(e.target.value);
    //       }}
    //     />
    //     <label htmlFor="password">password :</label>
    //     <input
    //       type="password"
    //       name="password"
    //       id="password"
    //       value={password}
    //       onChange={(e) => {
    //         setPassword(e.target.value);
    //       }}
    //     />
    //     <label htmlFor="password2">confirm password :</label>
    //     <input
    //       type="password"
    //       name="password2"
    //       id="password2"
    //       value={password2}
    //       onChange={(e) => {
    //         setPassword2(e.target.value);
    //       }}
    //     />
    //     <input type="file" id="image" onChange={handleImageChange} />
    //   </div>
    //   <button type="submit">submit</button>
    // </form>
  );
};

export default Register;
