import React from "react";
import { CiLogout } from "react-icons/ci";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { MyContext } from "../MyContext";
import { useContext } from "react";
import { Navigate } from "react-router-dom";

function Sidebar() {
  const { me, setMe } = useContext(MyContext);

  return (
    <div className="sidebar bg-white w-[20vw]">
      <div className="px-4 py-6">
        <span className="font-extrabold text-blue-600 bg-blue-200 p-2 pr-3 pl-3 rounded-lg">
          <Link to={"/"}>FriendsBook</Link>
        </span>

        <ul className="mt-6 space-y-1">
          <li>
            <a
              href="#"
              className="block rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700">
              Feed
            </a>
          </li>

          <li>
            <Link
              to={"/chat"}
              className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700">
              Chat
            </Link>
          </li>
        </ul>
      </div>

      <div className="sticky inset-x-0 bottom-0 border-t border-gray-100">
        <button
          className="flex items-center gap-3 rounded-lg px-4 py-2 text-sm font-medium text-red-500 hover:bg-red-100 hover:text-white-700 m-2 slowhover"
          onClick={() => {
            localStorage.clear();
            return <Navigate to="/register" />;
            const { me, setMe } = useContext(MyContext);
            setMe(null);
          }}>
          <Link to="/login" className="flex gap-3 items-center w-full">
            <CiLogout />
            Logout
          </Link>
        </button>
        <Link
          to={"/user/" + me?.username}
          className="flex items-center gap-2 bg-white p-4 hover:bg-gray-50">
          <img
            alt=""
            src={"http://127.0.0.1:8000" + me?.pfp}
            className="size-10 rounded-full object-cover"
          />

          <div>
            <p className="text-xs">
              <strong className="block font-medium">{me?.username}</strong>

              <span> {me?.email} </span>
            </p>
          </div>
        </Link>
      </div>
    </div>
    // </div>
  );
}

export default Sidebar;
