import React from "react";
import { FaRegHeart } from "react-icons/fa";

import { FaRegCommentDots } from "react-icons/fa";

function PostCard() {
  return (
    <>
      <div className="bg-white rounded-lg w-full text-black mb-4">
        <span
          href="#"
          className="block rounded-lg p-4 shadow-sm shadow-indigo-100">
          <img
            alt=""
            src="https://images.unsplash.com/photo-1613545325278-f24b0cae1224?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
            className="h-full w-full rounded-md object-cover"
          />

          <div className="mt-2">
            <div className="flex items-center gap-3 mt-3">
              <div className="w-10">
                <img
                  src="https://images.unsplash.com/photo-1721925376073-4d2c53dd12f2?q=80&w=1886&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt=""
                  className="size-10 rounded-full object-cover"
                />
              </div>
              <dl>
                <div>
                  <dd className="font-medium">@adityamadwal</dd>
                </div>
                <div>
                  <dd className="text-sm text-gray-500">12 August, 2024</dd>
                </div>
              </dl>
            </div>

            <div className="mt-6 flex items-center gap-8 text-xs justify-end">
              <button className="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
                <span className="text-lg">
                  <FaRegHeart />
                </span>

                <div className="mt-1.5 sm:mt-0">
                  <p className="text-gray-500">112</p>
                </div>
              </button>

              <button className="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
                <span className="text-lg">
                  <FaRegCommentDots />
                </span>
                <div className="mt-1.5 sm:mt-0">
                  <p className="text-gray-500">78</p>
                </div>
              </button>
            </div>
          </div>
        </span>
      </div>
      <div className="bg-white rounded-lg w-full text-black">
        <span
          href="#"
          className="block rounded-lg p-4 shadow-sm shadow-indigo-100">
          <img
            alt=""
            src="https://images.unsplash.com/photo-1721925376073-4d2c53dd12f2?q=80&w=1886&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            className="h-full w-full rounded-md object-cover"
          />

          <div className="mt-2">
            <div className="flex items-center gap-3 mt-3">
              <div className="w-10">
                <img
                  src="https://images.unsplash.com/photo-1721925376073-4d2c53dd12f2?q=80&w=1886&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt=""
                  className="size-10 rounded-full object-cover"
                />
              </div>
              <dl>
                <div>
                  <dd className="font-medium">@adityamadwal</dd>
                </div>
                <div>
                  <dd className="text-sm text-gray-500">12 August, 2024</dd>
                </div>
              </dl>
            </div>

            <div className="mt-6 flex items-center gap-8 text-xs justify-end">
              <button className="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
                <span className="text-lg">
                  <FaRegHeart />
                </span>

                <div className="mt-1.5 sm:mt-0">
                  <p className="text-gray-500">112</p>
                </div>
              </button>

              <button className="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
                <span className="text-lg">
                  <FaRegCommentDots />
                </span>
                <div className="mt-1.5 sm:mt-0">
                  <p className="text-gray-500">78</p>
                </div>
              </button>
            </div>
          </div>
        </span>
      </div>
    </>
  );
}

export default PostCard;
