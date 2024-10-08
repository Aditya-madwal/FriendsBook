import React, { useState, useEffect, useContext } from "react";
import { CiLogout } from "react-icons/ci";
import { Link, useParams } from "react-router-dom";
import { MyContext } from "../../MyContext";
import api from "../../api";

function ChatSidebar(props) {
  let { connection_uid } = useParams();

  const { me } = useContext(MyContext);

  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const fetchFriends = async () => {
      try {
        const response = await api.get(`/api/showfriends/${me?.username}`);
        console.log("friends fetched");
        console.log(response.data);
        setFriends(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchFriends();
  }, [me, connection_uid]); // Adding me.username as a dependency

  return (
    <div className="sidebar bg-white h-screen flex flex-col w-full">
      <div className="px-4 pt-6 mb-4">
        <span className="font-extrabold text-blue-600 bg-blue-200 p-2 pr-3 pl-3 rounded-lg">
          <Link to={"/chat"}>FriendsBook : Chat</Link>
        </span>
      </div>

      {/* Scrollable container for the friends list */}
      <ul className="mt-4 space-y-1 overflow-y-auto px-4 flex-1">
        {friends?.map((f) => {
          return (
            <>
              {props.friend?.username == f.frnd.username ? (
                <li
                  key={f.frnd.username}
                  className="flex rounded-lg bg-gray-900 px-4 py-2 text-white justify-start items-center gap-2">
                  <img
                    src={"http://127.0.0.1:8000" + f.frnd.pfp}
                    alt="pfp"
                    className="h-[30px] w-[30px] rounded-full object-cover"
                  />
                  <Link
                    className="text-sm font-medium text-white"
                    to={`/chat/${f.connection_uid}`}>
                    {f.frnd.username || "Sample Friend"}
                  </Link>
                </li>
              ) : (
                <li
                  key={f.frnd.username}
                  className="rounded-lg bg-gray-100 px-4 py-2 flex justify-start items-center gap-2">
                  <img
                    src={"http://127.0.0.1:8000" + f.frnd.pfp}
                    alt="pfp"
                    className="h-[30px] w-[30px] rounded-full object-cover"
                  />
                  <Link
                    className="text-sm font-medium text-gray-700"
                    to={`/chat/${f.connection_uid}`}>
                    {f.frnd.username || "Sample Friend"}
                  </Link>
                </li>
              )}
            </>
          );
        })}
      </ul>

      <div className="sticky bottom-0 border-gray-100">
        <button className="flex items-center gap-3 rounded-lg px-4 py-2 text-sm font-medium text-red-500 hover:bg-red-100 hover:text-white-700 m-2">
          <Link to="/" className="flex gap-3 items-center w-full">
            <CiLogout />
            Main Page
          </Link>
        </button>
        <Link
          to={"/user/" + me?.username}
          className="flex items-center gap-2 bg-white p-4 hover:bg-gray-50">
          <img
            alt="User Profile"
            src={"http://127.0.0.1:8000" + me?.pfp}
            className="w-10 h-10 rounded-full object-cover"
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
  );
}

export default ChatSidebar;
