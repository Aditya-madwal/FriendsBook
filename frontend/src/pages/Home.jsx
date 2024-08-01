import React, { useEffect, useState } from "react";
import api from "../api";
import { ACCESS_TOKEN } from "../constants";

const Home = () => {
  const [data, setData] = useState(null);
  let response = "";

  const fetchUserData = async () => {
    try {
      response = await api.get("/users/sample");
      console.log(response.data); // Access the data here
      setData(response.data.pfp);
    } catch (error) {
      console.error(error);
    }
  };

  // fetchUserData();

  useEffect(() => {
    fetchUserData();
    console.log(`${import.meta.env.IMAGES_URL}/${data}`);
  }, []);

  console.log(JSON.stringify(response.data));

  return (
    <>
      <img src={`${import.meta.env.VITE_API_URL}/images/${data}`} alt="" />
    </>
  );
};

export default Home;
