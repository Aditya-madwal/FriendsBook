import React, { useEffect, useState } from "react";
import api from "../api";
import { ACCESS_TOKEN } from "../constants";
import Sidebar from "../components/Sidebar";
import FriendRequests from "../components/FriendRequests";
import AddPost from "../components/AddPost";
import SearchBar from "../components/SearchBar";
import PostCard from "../components/PostCard";
import Suggestions from "../components/Suggestions";

const Home = () => {
  const [data, setData] = useState(null);

  return (
    <div className="flex bg-[#F5F7F8]">
      <Sidebar />
      <div className="w-[50vw] h-fit flex flex-col items-center text-white p-4">
        <div className="flex w-full justify-start ml-4 mb-4">
          <span className="text-3xl text-black font-bold">Feeds</span>
        </div>
        <AddPost />
        <PostCard />
      </div>
      <div className="right-side-bar-home h-screen">
        <SearchBar />
        <FriendRequests />
        <Suggestions />
      </div>
    </div>
  );
};

export default Home;
