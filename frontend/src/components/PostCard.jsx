import React, { useState } from "react";
import { FaRegHeart } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";

import { FaRegCommentDots } from "react-icons/fa";

function PostCard(props) {
  const [showComments, setShowComments] = useState(false);
  return (
    <>
      <div className="bg-white rounded-lg w-full text-black mb-4 m-2">
        <span
          href="#"
          className="block rounded-lg p-4 shadow-sm shadow-indigo-100">
          <img
            alt=""
            // src={props?.image}
            src="https://images.unsplash.com/photo-1722185128411-456d36207767?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            className="h-full w-full rounded-md object-cover"
          />

          <div className="mt-2">
            <div className="flex items-start gap-3 mt-3">
              <div className="w-10">
                <img
                  // src={props.user?.pfp}
                  src="https://images.unsplash.com/photo-1722022233014-2c01fea16fa3?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxNXx8fGVufDB8fHx8fA%3D%3D"
                  alt="pfp"
                  className="size-10 rounded-full object-cover"
                />
              </div>
              <dl className="w-fit">
                <div>
                  {/* <dd className="font-medium">@{props?.user?.username}</dd> */}
                  <dd className="font-medium">@wekdnek</dd>
                </div>
                <div>
                  <dd className="text-sm text-gray-500">12 Sep, 2023</dd>
                  {/* <dd className="text-sm text-gray-500">{props?.posted_on}</dd> */}
                </div>
                <div>
                  {/* <dd className="font-sm text-sm mt-2">{props?.desc}</dd> */}
                  <dd className="font-sm text-sm mt-2">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Illo, itaque? Veniam autem nulla quam nostrum, facere dolore
                    explicabo, perspiciatis placeat minus officiis voluptate.
                    Pariatur, veniam modi asperiores amet tempore quos neque
                    quidem hic? Illo debitis adipisci, tempore ex sequi ut?
                  </dd>
                </div>
              </dl>
            </div>

            <div className="mt-6 flex items-center gap-8 text-xs justify-end">
              <button className="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
                <span className="text-lg">
                  <FaRegHeart />
                </span>

                <div className="mt-1.5 sm:mt-0">
                  <p className="text-gray-500">{props?.likes}</p>
                  <p className="text-gray-500">112</p>
                </div>
              </button>

              <button
                className="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2"
                onClick={() => setShowComments(!showComments)}>
                <span className="text-lg">
                  <FaRegCommentDots />
                </span>
                <div className="mt-1.5 sm:mt-0">
                  <p className="text-gray-500">78</p>
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
              <div class="flex items-start gap-2.5 mt-3">
                <img
                  class="w-8 h-8 rounded-full object-cover"
                  src="https://images.unsplash.com/photo-1721925376073-4d2c53dd12f2?q=80&w=1886&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="Jese image"
                />
                <div class="flex flex-col w-full  leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl">
                  <div class="flex items-center space-x-2 justify-between">
                    <span class="text-sm font-semibold text-gray-900">
                      Bonnie Green
                      <span class="text-sm font-normal text-gray-500 dark:text-gray-400 ml-2">
                        14 Spetember, 2024
                      </span>
                    </span>
                    <button className="text-md flex text-red-600 items-center justify-center hover:bg-red-200 p-1 hover:rounded-lg slowhover">
                      <MdDeleteForever />
                      <span className="text-xs">Delete</span>
                    </button>
                  </div>
                  <p class="text-sm font-normal py-2.5 text-gray-900 ">
                    That's awesome. I think our users will really appreciate the
                    improvements.
                  </p>
                </div>
              </div>
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
