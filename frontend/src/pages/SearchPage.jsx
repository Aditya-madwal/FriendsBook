import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import SearchBar from "../components/SearchBar";
import FriendRequests from "../components/FriendRequests";
import Suggestions from "../components/Suggestions";
import PostCard from "../components/PostCard";
import api from "../api";

import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

function SearchPage() {
  const location = useLocation();
  const url_category = new URLSearchParams(location.search).get("category");
  let url_query = new URLSearchParams(location.search).get("query");

  const [category, setCategory] = useState("posts");
  const [query, setQuery] = useState(null);
  let [People, setPeople] = useState([]);
  let [Posts, setPosts] = useState([]);
  let [response_came, setcame] = useState(false);
  let [loading, setLoading] = useState(false);

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
    fetch_search_results(url_query);
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
    fetch_search_results(url_query);
  };

  const AddComment = async (uid, content) => {
    if (uid != null) {
      try {
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
        fetch_search_results(url_query);
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
        fetch_search_results(url_query);
      }
    }
  };

  const fetch_search_results = async (query) => {
    setLoading(true);
    let data = {
      query: query,
    };
    try {
      await api
        .post(`/api/search`, data)
        .then((response) => {
          console.log(response.data);
          setPeople(response.data.people);
          setPosts(response.data.posts);
        })
        .catch((error) => {
          console.error(error);
        });
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetch_search_results(url_query);
  }, [url_query]);

  useEffect(() => {
    setCategory(url_category);
    setQuery(url_query);
  });

  useEffect(() => {
    People ? setPeople(People) : null;
    Posts ? setcame(true) : null;
  }, []);

  return (
    <div className="flex bg-gray-100">
      <Sidebar category="posts" />
      <div className="maincontent flex justify-center w-[50vw]">
        <div className="container flex flex-col items-center mt-4">
          <span className="font-extrabold text-4xl">
            Search <span className="text-blue-500">FriendsBook</span>
          </span>
          <SearchBar />
          <div className="tabs w-[40vw] flex justify-center mt-2">
            <div className="hidden sm:block">
              <nav className="flex gap-6" aria-label="Tabs">
                {category == "people" ? (
                  <Link
                    to={"/search/?category=people&query=" + query}
                    className="shrink-0 rounded-lg bg-sky-100 p-2 text-sm font-medium text-sky-600">
                    People ({People?.length})
                  </Link>
                ) : (
                  <Link
                    to={"/search/?category=people&query=" + query}
                    className="shrink-0 rounded-lg p-2 text-sm font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-700">
                    People ({People?.length})
                  </Link>
                )}
                {category == "posts" ? (
                  <Link
                    to={"/search/?category=posts&query=" + query}
                    className="shrink-0 rounded-lg bg-sky-100 p-2 text-sm font-medium text-sky-600">
                    Posts ({Posts?.length})
                  </Link>
                ) : (
                  <Link
                    to={"/search/?category=posts&query=" + query}
                    className="shrink-0 rounded-lg p-2 text-sm font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-700">
                    Posts ({Posts?.length})
                  </Link>
                )}
              </nav>
            </div>
          </div>
          {response_came ? (
            <span className="mt-7 w-full pr-2 pl-2">
              {" "}
              {category == "posts" ? (
                <div key={query}>
                  {Posts?.map((p) => {
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
                        />
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div key={query}>
                  {People?.map((person) => {
                    return (
                      <div className="flex bg-white p-3 rounded-lg mb-4 items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="flex-shrink-0 rounded-full overflow-hidden w-16 h-16">
                            {person.pfp ? (
                              <img
                                src={"http://127.0.0.1:8000" + person.pfp}
                                alt="pfp"
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <img
                                src={
                                  "http://127.0.0.1:8000/images/pfps/default.png"
                                }
                                alt="pfp"
                                className="w-full h-full object-cover"
                              />
                            )}
                          </div>
                          <div className="flex flex-col">
                            <h3 className="text-xl text-black font-semibold">
                              {person.first_name} {person.last_name}
                            </h3>
                            <dl className="mt-0.5 text-md text-gray-600 font-medium">
                              <dd className="inline">@{person.username}</dd>
                            </dl>
                            <dl className="mt-0.5 text-sm text-gray-600 font-medium">
                              <dd className="inline">{person.bio}</dd>
                            </dl>
                          </div>
                        </div>
                        <Link
                          className="flex items-center gap-2 text-blue-600 bg-blue-200 p-2 pr-3 pl-3 rounded-lg border-0 hover:bg-blue-300 hover:text-blue-700"
                          to={`/user/${person.username}`}>
                          View User
                        </Link>
                      </div>
                    );
                  })}
                </div>
              )}
            </span>
          ) : (
            <></>
          )}
        </div>
      </div>
      <div className="right-side-bar-home h-screen">
        <FriendRequests />
        <Suggestions />
      </div>
    </div>
  );
}

export default SearchPage;
