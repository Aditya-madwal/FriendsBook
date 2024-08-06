import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import React from "react";
import api from "../api";
import Sidebar from "../components/Sidebar";
import Page404 from "./Page404";
import { IoMdPersonAdd } from "react-icons/io";
import { useContext } from "react";
import { MyContext } from "../MyContext";

import PostCard from "../components/PostCard";

function Userdash() {
  const { username } = useParams();
  const { me, setMe } = useContext(MyContext);

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [err, setError] = useState(null);
  const [friends, setFriends] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await api.get(`/api/showuser/${username}`);
        console.log(response.data);
        setUser(response.data);
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
        setLoading(false);
      }
    };

    fetchUserData();
  }, [username]);

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const response = await api.get(`/api/showfriends/${user.username}`);
        setFriends(response.data);
        console.log(response.data);
      } catch (error) {
        if (error.response) {
          setError(
            `Error: ${error.response.status} - ${error.response.statusText}`
          );

          console.log("error---------->" + error.response);
        } else if (error.request) {
          setError("Error: No response received from server");
          console.log("error -------------->" + err);
        } else {
          setError(`Error: ${error.message}`);
        }
      } finally {
        setLoading(false);
      }
    };
    if (me != null) {
      fetchFriends();
    }
  }, [me]);

  return loading ? (
    <div className="flex justify-center items-center h-screen">Loading...</div>
  ) : (
    <>
      {user == null ? (
        <Page404 />
      ) : (
        <div className="flex bg-gray-100">
          <Sidebar />
          <div className="main-content">
            <div className="w-[40vh] h-[40vh] overflow-hidden rounded-full bg-white mb-5">
              <img
                src={"http://127.0.0.1:8000" + user?.pfp}
                alt="Long Image"
                className="w-full h-full circle-img object-cover"
              />
            </div>
            <div className="btns mb-3 ">
              <span className="inline-flex overflow-hidden">
                {me.username != user.username ? (
                  <>
                    <button
                      className="flex items-center gap-2 slowhover text-blue-600 bg-blue-200 p-2 pr-3 pl-3 rounded-lg border-0 hover:bg-blue-700 hover:text-white"
                      title="Edit Product">
                      <IoMdPersonAdd /> Add Friend
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      className="flex items-center gap-3 slowhover font-extrabold text-blue-600 bg-blue-200 p-2 pr-3 pl-3 rounded-lg mr-3 h-fit hover:bg-blue-700 hover:text-white"
                      title="Edit Product">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="h-4 w-4">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                        />
                      </svg>
                      Edit
                    </button>
                    <button
                      className="flex items-center gap-3 slowhover  text-red-600 bg-red-200 p-2 pr-3 pl-3 rounded-lg mr-3 h-fit hover:bg-red-700 hover:text-white"
                      title="Delete Product">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="h-4 w-4">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                        />
                      </svg>
                      Delete
                    </button>
                  </>
                )}
              </span>
            </div>
            <div className="details-text-container w-[60vw] bg-white rounded-lg">
              <div className="flow-root rounded-lg border border-gray-100 py-3 shadow-sm">
                <dl className="-my-3 divide-y divide-gray-100 text-sm">
                  <div className="grid grid-cols-1 gap-1 p-3 sm:grid-cols-3 sm:gap-4">
                    <dt className="font-medium text-gray-900">Username</dt>
                    <dd className="text-gray-700 sm:col-span-2">
                      {user?.username}
                    </dd>
                  </div>

                  <div className="grid grid-cols-1 gap-1 p-3 sm:grid-cols-3 sm:gap-4">
                    <dt className="font-medium text-gray-900">Full Name</dt>
                    <dd className="text-gray-700 sm:col-span-2">
                      {user?.first_name} {user?.last_name}
                    </dd>
                  </div>

                  <div className="grid grid-cols-1 gap-1 p-3 sm:grid-cols-3 sm:gap-4">
                    <dt className="font-medium text-gray-900">Email</dt>
                    <dd className="text-gray-700 sm:col-span-2">
                      {user?.email}
                    </dd>
                  </div>

                  <div className="grid grid-cols-1 gap-1 p-3 sm:grid-cols-3 sm:gap-4">
                    <dt className="font-medium text-gray-900">Bio</dt>
                    <dd className="text-gray-700 sm:col-span-2">{user?.bio}</dd>
                  </div>
                  <div className="grid grid-cols-1 gap-1 p-3 sm:grid-cols-3 sm:gap-4">
                    <dt className="font-medium text-gray-900">Friends</dt>
                    <dd className="text-gray-700 sm:col-span-2">
                      <div className="flex items-center justify-start -space-x-1">
                        {friends ? (
                          friends.map((i) => (
                            <div className="h-10 w-10">
                              <img
                                className="h-full w-full rounded-full object-cover object-center ring ring-white"
                                src={"http://127.0.0.1:8000" + i.frnd.pfp}
                                alt=""
                              />
                            </div>
                          ))
                        ) : (
                          <div>Loading...</div>
                        )}
                        <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-white text-secondary-400 ring ring-white">
                          <span className="text-base bg-white">
                            +{friends?.length}
                          </span>
                        </div>
                      </div>
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
            <section className="w-[90%] mt-4 flex flex-col items-center">
              <span className="text-xl font-bold mb-[20px] mt-[20px]">
                Previous Posts :
              </span>
              <div className="post-container flex h-fit w-fit flex-wrap justify-center">
                <div className="w-[40%] m-2">
                  <PostCard />
                </div>
                <div className="w-[40%] m-2">
                  <PostCard />
                </div>
                <div className="w-[40%] m-2">
                  <PostCard />
                </div>
                <div className="w-[40%] m-2">
                  <PostCard />
                </div>
                <div className="w-[40%] m-2">
                  <PostCard />
                </div>
                <div className="w-[40%] m-2">
                  <PostCard />
                </div>
              </div>
            </section>
          </div>
        </div>
      )}
    </>
  );
}

export default Userdash;
