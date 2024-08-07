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
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await api.get(
          "http://127.0.0.1:8000/api/showposts/feed"
        );
        setPosts(response.data);
        console.log(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return loading ? (
    <div>Loading...</div>
  ) : (
    <div className="flex bg-[#F5F7F8]">
      <Sidebar />
      <div className="w-[50vw] h-fit flex flex-col items-center text-white p-4">
        <div className="flex w-full justify-start ml-4 mb-4">
          <span className="text-3xl text-black font-bold">Feeds</span>
        </div>
        <AddPost />
        {posts.map((p) => {
          return (
            <PostCard
              user={p.user}
              image={p.image}
              likes={p.likes}
              comments={p.comments}
              title={p.title}
              desc={p.desc}
              posted_on={p.posted_on}
            />
          );
          // return <div key={i.title}>djwbd</div>;
        })}
        <span>length is : {posts.length}</span>
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
