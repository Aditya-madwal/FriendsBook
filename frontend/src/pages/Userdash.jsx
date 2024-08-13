import { UNSAFE_ErrorResponseImpl, useParams } from "react-router-dom";
import { useState, useEffect, useContext, useDebugValue } from "react";
import React from "react";
import api from "../api";

import { Link } from "react-router-dom";

import Sidebar from "../components/Sidebar";
import Page404 from "./Page404";
import { IoMdPersonAdd } from "react-icons/io";
import { MyContext } from "../MyContext";

import PostCard from "../components/PostCard";
import Loading from "../components/Loading";
import UserIdCard from "../components/UserIdCard";

import { FaArrowRight } from "react-icons/fa";

function Userdash() {
  const { username } = useParams();
  const { me, setMe } = useContext(MyContext);

  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [friends, setFriends] = useState([]);
  const [fraction_of_friends, setFraction] = useState(4);
  const [loadingUser, setLoadingUser] = useState(true);
  const [loadingPosts, setLoadingPosts] = useState(true);
  const [loadingFriends, setLoadingFriends] = useState(true);
  const [err, setError] = useState(null);
  const [fullscreen, setfullscreen] = useState(false);

  const [verificationAlert, setVerificationAlert] = useState(me?.verified);
  const [otppopup, setOtppopup] = useState(false);
  const [otpvalue, setotpvalue] = useState(null);

  const [loading, setLoading] = useState(true);
  const [clearcmt, setClearcmt] = useState(false);
  const [cmtsloading, setcmtloading] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      setLoadingUser(true);
      try {
        const response = await api.get(`/api/showuser/${username}`);
        setUser(response.data);
      } catch (error) {
        handleApiError(error);
      } finally {
        setLoadingUser(false);
      }
    };

    fetchUserData();
  }, [username]);

  // Fetch user posts
  useEffect(() => {
    const fetchPosts = async () => {
      setLoadingPosts(true);
      try {
        const response = await api.get(
          `http://127.0.0.1:8000/api/showposts/${username}`
        );
        setPosts(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoadingPosts(false);
      }
    };

    fetchPosts();
  }, [username]);

  // Fetch friends
  useEffect(() => {
    const fetchFriends = async () => {
      if (user) {
        setLoadingFriends(true);
        try {
          const response = await api.get(`/api/showfriends/${user.username}`);
          console.log(response.data);
          setFriends(response.data);
        } catch (error) {
          handleApiError(error);
        } finally {
          setLoadingFriends(false);
        }
      }
    };

    fetchFriends();
  }, [user]);

  const sendOTPrequest = async () => {
    try {
      const response = await api.get("api/verifymyemail").then((res) => {
        console.log(res);
        setOtppopup(true);
      });
    } catch (error) {
      alert("some error occured");
    }
  };

  const sendOTPresponse = async (otp) => {
    try {
      const response = await api
        .post("/api/verifymyemail", {
          otp: otpvalue,
        })
        .then((res) => {
          if (res.data.status === "verified") {
            alert("Account verification successfull");
          } else {
            alert("some error occured");
          }
        });
    } catch (e) {
      alert("caught some errors");
    }
  };

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

  if (loadingUser || loadingPosts || loadingFriends) {
    return <Loading />;
  }

  return (
    <>
      {user == null ? (
        <Page404 />
      ) : (
        <>
          {/* fullscreen ----------------------------------- */}
          {fullscreen ? (
            <div>
              {/* Main modal */}
              <div
                id="static-modal"
                data-modal-backdrop="static"
                tabIndex="-1"
                aria-hidden="true"
                className="flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full h-full shadow-lg backdrop-blur-sm">
                <div className="relative p-4 w-full max-w-2xl h-90vh">
                  {/* Modal content */}
                  <div className="relative bg-white rounded-lg shadow  h-full">
                    {/* Modal header */}
                    <div className="flex items-center justify-between p-4 md:p-5 rounded-t ">
                      <h3 className="text-xl font-semibold text-gray-900 ">
                        Current Friends
                      </h3>
                      <button
                        type="button"
                        className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center "
                        data-modal-hide="static-modal"
                        onClick={() => setfullscreen(false)}>
                        <svg
                          className="w-3 h-3"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 14 14">
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                          />
                        </svg>
                        <span className="sr-only">Close modal</span>
                      </button>
                    </div>
                    {/* Modal body */}
                    <div className="p-4 md:p-5 space-y-4 overflow-y-auto h-[calc(90vh-8rem)]">
                      <ul className="space-y-4">
                        {friends?.map((f) => {
                          return (
                            <li className="flex items-center gap-4 bg-gray-100 p-5 rounded-lg mb-[10px]">
                              <div className=" flex items-center h-full overflow-hidden rounded-full bg-gray-200">
                                <img
                                  src={"http://127.0.0.1:8000" + f.frnd.pfp}
                                  // src="https://images.unsplash.com/photo-1722518805100-f17276502925?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw5fHx8ZW58MHx8fHx8"
                                  alt="pfp"
                                  className="size-11 rounded object-cover"
                                />
                              </div>

                              <div>
                                <h3 className="text-md text-black font-semibold">
                                  {f.frnd.first_name} {f.frnd.last_name}
                                </h3>

                                <dl className="mt-0.5 space-y-px text-sm text-gray-600 font-medium">
                                  <div>
                                    {/* <dd className="inline">@{i.sender.username}</dd> */}
                                    <dd className="inline">
                                      @{f.frnd.username}
                                    </dd>
                                  </div>
                                </dl>
                              </div>

                              <div className="flex flex-1 items-center justify-end gap-2">
                                <button
                                  className="text-green-500 transition hover:text-green-600 text-md bg-green-300 rounded-lg p-2 slowhover pr-2 pl-2 flex items-center justify-center"
                                  onClick={() => {}}>
                                  Message
                                  <span className="text-xl"></span>
                                </button>
                                <button className="text-red-500 transition hover:text-red-600 text-md bg-red-300 rounded-lg p-2 slowhover pr-2 pl-2 flex items-center justify-center">
                                  UnFriend
                                </button>
                              </div>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : null}
          {/* ----------------------------------- fullscreen*/}
          {/* OTP MODAL ----------------------------------- */}
          {otppopup ? (
            <div
              id="static-modal"
              data-modal-backdrop="static"
              tabIndex="-1"
              aria-hidden="true"
              className="flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full h-full shadow-lg backdrop-blur-sm">
              <div className="relative p-4 w-full max-w-2xl h-90vh">
                {/* Modal content */}
                <div class="rounded-lg bg-white p-8 shadow-2xl">
                  <h2 class="text-lg font-bold">Email Verification</h2>

                  <p class="mt-2 text-sm text-gray-500">
                    Enter the OTP Sent to your email address ({me?.email}) here
                    :
                  </p>
                  <input
                    type="number"
                    id="otpinput"
                    placeholder="454545"
                    value={otpvalue}
                    onChange={(e) => {
                      setotpvalue(e.target.value);
                    }}
                    className="mt-3 mb-3 w-full h-10 rounded-md border-gray-200 shadow-sm sm:text-sm"
                  />

                  <div class="mt-4 flex gap-2">
                    <button
                      type="button"
                      class="rounded bg-blue-50 px-4 py-2 text-sm font-medium text-blue-600"
                      onClick={() => {
                        sendOTPresponse(otpvalue);
                        alert(otpvalue);
                      }}>
                      Verify
                    </button>

                    <button
                      type="button"
                      class="rounded bg-gray-50 px-4 py-2 text-sm font-medium text-gray-600"
                      onClick={() => setOtppopup(false)}>
                      Cancel
                    </button>

                    <button
                      type="button"
                      class="rounded bg-gray-50 px-4 py-2 text-sm font-medium text-gray-600"
                      onClick={() => sendOTPrequest()}>
                      Send Another OTP
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : null}
          {/* ----------------------------------- OTP MODAL */}
          <div className="flex bg-gray-100">
            <Sidebar />
            {/* email verification alert ============================ */}
            <div className="main-content">
              {verificationAlert ? null : (
                <div className="w-[90%] rounded-lg mt-3">
                  <div className="bg-red-200 px-4 py-3 w-full  text-red-600 sm:flex sm:items-center rounded-lg sm:justify-between sm:px-6 lg:px-8">
                    <p className="text-center font-medium sm:text-left">
                      Your Email is currently not verified...
                      <br className="sm:hidden" />
                      <button
                        className="underline font-bold ml-2"
                        onClick={() => {
                          setOtppopup(true);
                          sendOTPrequest();
                        }}>
                        Verify Now
                      </button>
                    </p>

                    <button
                      className="mt-4 block rounded-lg bg-red-600 bg-opacity-5 px-5 py-3 text-center text-sm font-medium text-red transition hover:bg-red-300  sm:mt-0"
                      onClick={() => setVerificationAlert(true)}>
                      I'll do it later
                    </button>
                  </div>
                </div>
              )}
              {/* email verification alert ============================ */}
              <div className="flex flex-col items-center mt-4">
                <div className="w-[40vh] h-[40vh] overflow-hidden rounded-full bg-white mb-5">
                  <img
                    src={"http://127.0.0.1:8000" + user?.pfp}
                    alt="Long Image"
                    className="w-full h-full circle-img object-cover"
                  />
                </div>
                <div className="btns mb-3 ">
                  <span className="inline-flex overflow-hidden">
                    {me.username !== user.username ? (
                      <button className="flex h-10 w-fit items-center justify-center overflow-hidden rounded-lg bg-blue-100 text-blue-400  gap-2 pr-4 pl-3 hover:bg-blue-200 hover:text-blue-700 slowhover ">
                        <IoMdPersonAdd /> Add Friend
                      </button>
                    ) : (
                      <>
                        <button
                          className="flex h-10 w-fit items-center justify-center  rounded-lg bg-blue-100 text-blue-400  gap-2  pr-4 pl-3 hover:bg-blue-200 hover:text-blue-700 slowhover mr-4"
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
                          className="flex h-10 w-fit items-center justify-center overflow-hidden rounded-lg bg-red-100 text-red-400 gap-2 ring-white pr-4 pl-3 hover:bg-red-200 hover:text-red-700 slowhover"
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
                        <dd className="text-gray-700 sm:col-span-2  italic">
                          @{user?.username}
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
                        <dd className="text-gray-700 sm:col-span-2">
                          {user?.bio}
                        </dd>
                      </div>
                      <div className="grid grid-cols-1 gap-1 p-3 sm:grid-cols-3 sm:gap-4">
                        <dt className="font-medium text-gray-900">Friends</dt>
                        <dd className="text-gray-700 sm:col-span-2">
                          <div
                            className="flex items-center justify-start -space-x-1"
                            key="frnds">
                            {friends.slice(0, fraction_of_friends)?.map((i) => (
                              <div className="h-10 w-10" key={i.frnd.id}>
                                {i.frnd.pfp ? (
                                  <Link
                                    to={
                                      "http://127.0.0.1:8000/api/showuser/" +
                                      i.frnd.username
                                    }>
                                    <img
                                      className="h-full w-full rounded-full object-cover object-center ring ring-white"
                                      src={"http://127.0.0.1:8000" + i.frnd.pfp}
                                      // alt={i.frnd.username}
                                    />
                                  </Link>
                                ) : (
                                  <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-gray-100 text-secondary-400 ring ring-white">
                                    <span className="text-base">
                                      {i.frnd.first_name[0]}
                                    </span>
                                  </div>
                                )}
                              </div>
                            ))}
                            {friends?.length == 0 ? (
                              <div>No friends yet</div>
                            ) : (
                              <div>
                                {friends?.length <= 4 ? null : (
                                  <button
                                    className="flex h-10 w-fit items-center justify-center overflow-hidden rounded-full bg-blue-100 text-blue-400 ring gap-2 ring-white pr-4 pl-3 hover:bg-blue-200 hover:text-blue-700 slowhover"
                                    onClick={() => {
                                      setfullscreen(true);
                                    }}>
                                    <span className="text-base flex items-center justify-center">
                                      Show All (+
                                      {friends?.length - fraction_of_friends})
                                    </span>
                                    <FaArrowRight />
                                  </button>
                                )}
                              </div>
                            )}
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
                  <div className="post-container flex h-fit w-full flex-wrap justify-center">
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
                    })}
                  </div>
                </section>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default Userdash;
