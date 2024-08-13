import React, { useEffect, useState } from "react";
import api from "../api";
import { ACCESS_TOKEN } from "../constants";
import Sidebar from "../components/Sidebar";
import FriendRequests from "../components/FriendRequests";
import AddPost from "../components/AddPost";
import SearchBar from "../components/SearchBar";
import PostCard from "../components/PostCard";
import Suggestions from "../components/Suggestions";
import Loading from "../components/Loading";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [clearcmt, setClearcmt] = useState(false);
  const [cmtsloading, setcmtloading] = useState(false);

  const Likehandle = async (uid) => {
    if (uid != null) {
      try {
        const response = await api
          .post(`/api/like`, {
            post_uid: uid,
          })
          .then((res) => console.log(res));
      } catch (e) {
        console.log("like update -->" + e);
      }
    }
    fetchPosts();
  };

  const UnLikehandle = async (uid) => {
    if (uid != null) {
      try {
        const response = await api
          .delete(`/api/like/${uid}`)
          .then((res) => console.log(res));
      } catch (e) {
        console.log("like update -->" + e);
      }
    }
    fetchPosts();
  };

  const AddComment = async (uid, content) => {
    if (uid != null) {
      try {
        setcmtloading(true);
        const response = await api
          .post(`/api/addcomment`, {
            post: uid,
            content: content,
          })
          .then((res) => console.log(res));
        console.log(uid + " comment added : " + content);
      } catch (e) {
        console.log("comment update -->" + e);
      } finally {
        setcmtloading(false);
        fetchPosts();
      }
    }
  };

  const DelComment = async (cmt_uid) => {
    console.log("comment deleted");
    if (uid != null) {
      try {
        const response = await api
          .delete(`/api/deletecomment/${cmt_uid}`)
          .then((res) => console.log(res));
      } catch (e) {
        console.log("comment update -->" + e.data);
      } finally {
        fetchPosts();
      }
    }
  };

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

  useEffect(() => {
    fetchPosts();
  }, []);

  return loading ? (
    <div>
      <Loading />
    </div>
  ) : (
    <div className="flex bg-[#F5F7F8]">
      {cmtsloading ? <Loading /> : null}
      <Sidebar />
      <div
        className="w-[50vw] h-fit flex flex-col items-center text-white p-4"
        key="posts">
        <div className="flex w-full justify-start ml-4 mb-4">
          <span className="text-3xl text-black font-bold">Feeds</span>
        </div>
        <AddPost posts_refresh={fetchPosts} />
        {posts.map((p) => {
          return (
            <div key={p.id} className="w-full">
              <PostCard
                user={p.user}
                image={p.image}
                likes={p.likes}
                comments={p.comments}
                title={p.title}
                desc={p.desc}
                posted_on={p.posted_on}
                uid={p.uid}
                onlike={() => Likehandle(p.uid)}
                onunlike={() => UnLikehandle(p.uid)}
                is_liked_by_user={p.is_liked_by_user}
                key={p.id}
                addcmt={AddComment}
                delcmt={DelComment}
                posts_refresh={fetchPosts}
              />
            </div>
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
