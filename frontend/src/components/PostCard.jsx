import React, { useEffect, useState } from "react";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { FaRegCommentDots } from "react-icons/fa";
import { IoMdSend } from "react-icons/io";
import { useContext } from "react";
import { MyContext } from "../MyContext";
import { IoMdClose } from "react-icons/io";

import api from "../api";

function PostCard(props) {
  const [showComments, setShowComments] = useState(false);
  const [liked, setLiked] = useState(props.is_liked_by_user);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [newCommentAdded, setNew] = useState(false);
  const { me, setMe } = useContext(MyContext);
  const [imageFull, setImageFull] = useState(false);

  const toggleLike = () => {
    liked ? setLiked(false) : setLiked(true);
    playPopSound();
  };

  const { playPopSound } = useContext(MyContext);

  // =--------------------------------------------------------------------------

  const AddComment = async (uid, content) => {
    if (uid != null) {
      try {
        // setcmtloading(true);
        const response = await api
          .post(`/api/addcomment`, {
            post: uid,
            content: content,
          })
          .then((res) => console.log(res));
        playPopSound();
        console.log(uid + " comment added : " + content);
      } catch (e) {
        console.log("comment update -->" + e);
      } finally {
        // setcmtloading(false);
        setComment("");
        fetchComments(props.uid);
      }
    }
  };

  const DelComment = async (cmt_uid) => {
    console.log("comment deleted");
    if (cmt_uid != null) {
      try {
        const response = await api
          .delete(`/api/deletecomment/${cmt_uid}`)
          .then((res) => console.log(res));
        playPopSound();
      } catch (e) {
        console.log("comment update -->" + e.data);
      } finally {
        fetchComments(props.uid);
      }
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // =--------------------------------------------------------------------------

  const handleSubmit = (e) => {
    e.preventDefault();
    // let comment_copy = comment;
    // setComment("");
    // fetchComments(props.uid);
    // // setTimeout(fetchComments(props.uid), 3000);
    // props.addcmt(props.uid, comment_copy);
    AddComment(props.uid, comment);
  };

  const fetchComments = async (post_uid) => {
    try {
      const response = await api.get(`/api/showcomments/${post_uid}`);
      setComments(response.data);
      console.log("comments======>" + response.data);
      console.log(response.data[1]);
    } catch (err) {
      // setError(err);
      console.log(err);
    } finally {
      // setLoading(false);
      console.log("fetched comments");
    }
  };

  return (
    <>
      {imageFull ? (
        <div>
          <div className="fixed inset-0 bg-opacity-50 z-50 flex justify-center items-center  backdrop-blur-[5px]">
            <span className="flex items-start w-[90vw] justify-between">
              <div className="flex w-full justify-center">
                <div
                  role="status"
                  className="p-2 bg-white border rounded-lg shadow-lg ">
                  <img
                    src={props?.image}
                    alt="post image"
                    className="h-[90vh] rounded-lg"
                  />
                </div>
              </div>
              <button
                className="bg-black text-white p-2 rounded-full"
                onClick={() => setImageFull(false)}>
                <IoMdClose />
              </button>
            </span>
          </div>
        </div>
      ) : null}
      <div className="bg-white rounded-lg w-full text-black mb-4">
        <span
          href="#"
          className="block rounded-lg p-4 shadow-sm shadow-indigo-100">
          {props?.image ? (
            <button
              onClick={() => {
                setImageFull(true);
              }}>
              <img
                alt=""
                // src={"http://127.0.0.1:8000" + props?.image}
                src={props?.image}
                className="h-full w-full rounded-md object-cover"
              />
            </button>
          ) : (
            <></>
          )}

          <div className="mt-2">
            <div className="flex items-start gap-3 mt-3">
              <div className="w-10">
                {props.user?.pfp ? (
                  <img
                    alt=""
                    // src={"http://127.0.0.1:8000" + props?.user.pfp}
                    src={props?.user.pfp}
                    className="size-10 rounded-full object-cover"
                  />
                ) : (
                  <img
                    alt=""
                    src={"http://127.0.0.1:8000/images/pfps/default.png"}
                    className="size-10 rounded-full object-cover"
                  />
                )}
              </div>
              <dl className="w-fit">
                <div>
                  <dd className="font-medium">@{props.user?.username}</dd>
                  {/* <dd className="font-medium">@wekdnek</dd> */}
                </div>
                <div>
                  {/* <dd className="text-sm text-gray-500">12 Sep, 2023</dd> */}
                  <dd className="text-sm text-gray-500">
                    {formatDate(props?.posted_on)}
                  </dd>
                </div>
                <div>
                  <dd className="font-sm text-lg mt-2 font-semibold">
                    {props?.title}
                  </dd>
                  <dd className="font-sm text-sm text-gray-800 italic mt-2">
                    {props?.desc}
                  </dd>
                </div>
              </dl>
            </div>

            <div className="mt-6 flex items-center gap-8 text-xs justify-end">
              {liked ? (
                <button className="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2 text-red-600">
                  <button
                    className="text-lg text-red-600"
                    onClick={() => {
                      props.onunlike();
                      toggleLike();
                    }}>
                    <FaHeart />
                  </button>

                  <div className="mt-1.5 sm:mt-0">
                    <p className="text-gray-500">{props?.likes}</p>
                    {/* <p className="text-gray-500">112</p> */}
                  </div>
                </button>
              ) : (
                <button className="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
                  <button
                    className="text-lg"
                    onClick={() => {
                      props.onlike();
                      toggleLike();
                    }}>
                    <FaRegHeart />
                  </button>

                  <div className="mt-1.5 sm:mt-0">
                    <p className="text-gray-500">{props?.likes}</p>
                    {/* <p className="text-gray-500">112</p> */}
                  </div>
                </button>
              )}

              <button
                className="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2"
                onClick={() => {
                  setShowComments(!showComments);
                  fetchComments(props.uid);
                }}>
                <span className="text-lg">
                  <FaRegCommentDots />
                </span>
                <div className="mt-1.5 sm:mt-0">
                  <p className="text-gray-500">{props.comments}</p>
                </div>
              </button>
            </div>
          </div>
          {/* comments --------------- */}
          {showComments ? (
            <>
              <span className="flex w-full justify-center mt-4 mb-4">
                <hr className="w-[80%]" />
              </span>
              {/* Add comment input  */}
              <div className="addcomment flex justify-center items-center">
                {/* form for comments ------------------ */}
                <form
                  className="relative w-[80%]"
                  method="post"
                  onSubmit={handleSubmit}>
                  <label htmlFor="Search" className="sr-only">
                    {" "}
                    Search{" "}
                  </label>

                  <input
                    type="text"
                    id="Search"
                    value={comment}
                    onChange={(e) => {
                      setComment(e.target.value);
                    }}
                    placeholder="Add A Comment..."
                    className="w-full rounded-lg border-gray-200 py-2.5 pe-10 shadow-sm sm:text-sm"
                  />

                  <button
                    type="submit"
                    className="absolute inset-y-0 end-0 grid w-10 place-content-center">
                    <span className="text-gray-600 hover:text-blue-700">
                      <span className="sr-only">add comment</span>
                      <IoMdSend />
                    </span>
                  </button>
                </form>
                {/* ----------------- */}
              </div>
              {comments?.map((c) => {
                return (
                  <div class="flex items-start gap-2.5 mt-3" key={c.id}>
                    <img
                      class="w-8 h-8 rounded-full object-cover"
                      // src="https://images.unsplash.com/photo-1721925376073-4d2c53dd12f2?q=80&w=1886&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                      src={"http://127.0.0.1:8000" + c.user.pfp}
                      alt="Jese image"
                    />
                    <div class="flex flex-col w-full  leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl">
                      <div class="flex items-center space-x-2 justify-between">
                        <span class="text-sm font-semibold text-gray-900">
                          {c.user.first_name} {c.user.last_name}
                          <span class="text-sm font-normal text-gray-500 dark:text-gray-400 ml-2">
                            {c.time}
                          </span>
                        </span>
                        {c.user.username == props.username ||
                        c.user.username == me.username ? (
                          <button
                            className="text-md flex text-red-600 items-center justify-center hover:bg-red-200 p-1 hover:rounded-lg slowhover"
                            onClick={() => DelComment(c.uid)}>
                            <MdDeleteForever />
                            <span className="text-xs">Delete</span>
                          </button>
                        ) : null}
                      </div>
                      <p class="text-sm font-normal py-2.5 text-gray-900 ">
                        {c.content}
                      </p>
                    </div>
                  </div>
                );
              })}
            </>
          ) : (
            <></>
          )}
        </span>
      </div>
    </>
  );
}

export default PostCard;
