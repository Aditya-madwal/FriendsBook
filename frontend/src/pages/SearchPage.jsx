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
          console.log(Posts[0].user.pfp);
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
                  })}
                </div>
              ) : (
                <div key={query}>
                  {People?.map((person) => {
                    return (
                      <div className="flex bg-white p-3 rounded-lg mb-4  justify-between items-center">
                        <span className="flex items-start gap-4 bg-white rounded-lg">
                          <div className=" flex items-center h-full overflow-hidden rounded-full ">
                            <img
                              src={"http://127.0.0.1:8000" + person.pfp}
                              // src="https://images.unsplash.com/photo-1722756090869-8d74046e4989?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxM3x8fGVufDB8fHx8fA%3D%3D"
                              alt="pfp"
                              className="size-20 rounded object-cover"
                            />
                          </div>
                          <div className="w-[80%]">
                            <h3 className="text-xl text-black font-semibold">
                              {person.first_name} {person.last_name}
                            </h3>

                            <dl className="mt-0.5 space-y-px text-md text-gray-600 font-medium">
                              <div>
                                <dd className="inline">@{person.username}</dd>
                                {/* <dd className="inline">@wkebdeb</dd> */}
                              </div>
                            </dl>
                            <dl className="mt-0.5 space-y-px text-sm text-gray-600 font-medium">
                              <div>
                                <dd className="inline">{person.bio}</dd>
                                {/* <dd className="inline">
                                Lorem ipsum dolor sit amet consectetur
                                adipisicing elit. Nihil, cupiditate hic, rerum
                                nisi consectetur quam voluptates at ducimus
                                omnis odit sit debitis accusantium.
                              </dd> */}
                              </div>
                            </dl>
                          </div>
                        </span>
                        <button className="flex items-center gap-2 slowhover text-blue-600 bg-blue-200 p-2 pr-3 pl-3 rounded-lg border-0 hover:bg-blue-300 hover:text-blue-700">
                          View User
                        </button>
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
