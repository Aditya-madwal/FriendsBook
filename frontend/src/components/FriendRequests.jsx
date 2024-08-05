import React, { useEffect, useState } from "react";
import { IoIosAddCircle } from "react-icons/io";
import { MdDeleteForever } from "react-icons/md";
import { FaArrowRight } from "react-icons/fa";
import api from "../api";
import { Link } from "react-router-dom";

function FriendRequests() {
  const [fr, setFr] = useState(null);
  const [err, setError] = useState(null);

  useEffect(() => {
    const fetchFRs = async () => {
      try {
        const response = await api.get(`/api/showfriendrequests`);
        setFr(response.data);
        console.log(response.data.sent_requests);
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
      }
    };
    fetchFRs();
  }, []);

  return (
    <section className="w-[30vw]">
      <div className="p-5 m-3 rounded-lg text-black shadow-sm shadow-indigo-100 bg-white">
        <div className="">
          <header className="text-left">
            <h1 className="text-2xl font-bold text-black">Recent Requests</h1>
          </header>

          <div className="mt-8">
            <ul className="space-y-4">
              {fr?.recieved_requests.map((i) => {
                return (
                  <li className="flex items-center gap-4">
                    <div className=" flex items-center h-full overflow-hidden rounded-full bg-gray-200">
                      <img
                        src={"http://127.0.0.1:8000" + i.sender.pfp}
                        alt="pfp"
                        className="size-11 rounded object-cover"
                      />
                    </div>

                    <div>
                      <h3 className="text-sm text-black font-semibold">
                        {i.sender.first_name} {i.sender.last_name}
                      </h3>

                      <dl className="mt-0.5 space-y-px text-[10px] text-gray-600 font-medium">
                        <div>
                          <dd className="inline">@{i.sender.username}</dd>
                        </div>
                      </dl>
                    </div>

                    <div className="flex flex-1 items-center justify-end gap-2">
                      <button className="text-blue-500 transition hover:text-blue-600 text-2xl bg-blue-300 rounded-full p-1 slowhover">
                        <IoIosAddCircle />
                      </button>
                      <button className="text-red-500 transition hover:text-red-600 text-2xl bg-red-300 rounded-full p-1">
                        <MdDeleteForever />
                      </button>
                    </div>
                  </li>
                );
              })}
            </ul>

            <div className="flex justify-end pt-2 mt-3">
              <button className=" text-blue-600 bg-blue-200 p-2 pr-3 pl-3 rounded-lg w-full  hover:bg-blue-600 hover:text-white slowhover">
                <Link
                  to="/friendrequests"
                  className="flex justify-center items-center gap-2">
                  Show All Requests <FaArrowRight />
                </Link>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default FriendRequests;
