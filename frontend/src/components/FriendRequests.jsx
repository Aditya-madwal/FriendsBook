import React, { useEffect, useState } from "react";
import { IoIosAddCircle } from "react-icons/io";
import { MdDeleteForever } from "react-icons/md";
import { FaArrowRight } from "react-icons/fa";
import api from "../api";
import { Link } from "react-router-dom";

function FriendRequests() {
  const [fr, setFr] = useState(null);
  const [totalFrs, setTotalFrs] = useState(0);
  const [err, setError] = useState(null);
  let [NumFr, setNumFr] = useState(3);
  const [fullscreen, setfullscreen] = useState(false);

  const respond_request = async (username, response) => {
    const response_data = {
      response: response,
    };

    await api
      .post(`/api/friendops/${username}`, response_data)
      .then((response) => {
        console.log(username);
        console.log(response_data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    const fetchFRs = async () => {
      try {
        const response = await api.get(`/api/showfriendrequests`);
        setFr(response.data.recieved_requests);
        setTotalFrs(response.data.recieved_requests.length);
        // console.log(response.data.recieved_request.slice(0, 2));
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

  return fullscreen ? (
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
                Friend Requests
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
                <li className="flex items-center gap-4 bg-gray-100 p-5 rounded-lg mb-[10px]">
                  <div className=" flex items-center h-full overflow-hidden rounded-full bg-gray-200">
                    <img
                      //   src={"http://127.0.0.1:8000" + i.sender.pfp}
                      src="https://images.unsplash.com/photo-1722518805100-f17276502925?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw5fHx8ZW58MHx8fHx8"
                      alt="pfp"
                      className="size-11 rounded object-cover"
                    />
                  </div>

                  <div>
                    <h3 className="text-md text-black font-semibold">
                      {/* {i.sender.first_name} {i.sender.last_name} */}
                      jdnwed doiewhd
                    </h3>

                    <dl className="mt-0.5 space-y-px text-sm text-gray-600 font-medium">
                      <div>
                        {/* <dd className="inline">@{i.sender.username}</dd> */}
                        <dd className="inline">@kdnwekdn</dd>
                      </div>
                    </dl>
                  </div>

                  <div className="flex flex-1 items-center justify-end gap-2">
                    <button
                      className="text-blue-500 transition hover:text-blue-600 text-md bg-blue-300 rounded-lg p-1 slowhover pr-2 pl-2 flex items-center gap-2 justify-center"
                      onClick={() => {
                        // respond_request(i.sender.username, "yes");
                      }}>
                      Accept
                      <span className="text-xl">
                        <IoIosAddCircle />
                      </span>
                    </button>
                    <button className="text-red-500 transition hover:text-red-600 text-md bg-red-300 rounded-lg p-1 slowhover pr-2 pl-2 flex items-center gap-2 justify-center">
                      Delete{" "}
                      <span className="text-xl">
                        <MdDeleteForever />
                      </span>
                    </button>
                  </div>
                </li>
                <li className="flex items-center gap-4 bg-gray-100 p-5 rounded-lg mb-[10px]">
                  <div className=" flex items-center h-full overflow-hidden rounded-full bg-gray-200">
                    <img
                      //   src={"http://127.0.0.1:8000" + i.sender.pfp}
                      src="https://images.unsplash.com/photo-1722518805100-f17276502925?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw5fHx8ZW58MHx8fHx8"
                      alt="pfp"
                      className="size-11 rounded object-cover"
                    />
                  </div>

                  <div>
                    <h3 className="text-md text-black font-semibold">
                      {/* {i.sender.first_name} {i.sender.last_name} */}
                      jdnwed doiewhd
                    </h3>

                    <dl className="mt-0.5 space-y-px text-sm text-gray-600 font-medium">
                      <div>
                        {/* <dd className="inline">@{i.sender.username}</dd> */}
                        <dd className="inline">@kdnwekdn</dd>
                      </div>
                    </dl>
                  </div>

                  <div className="flex flex-1 items-center justify-end gap-2">
                    <button
                      className="text-blue-500 transition hover:text-blue-600 text-md bg-blue-300 rounded-lg p-1 slowhover pr-2 pl-2 flex items-center gap-2 justify-center"
                      onClick={() => {
                        // respond_request(i.sender.username, "yes");
                      }}>
                      Accept
                      <span className="text-xl">
                        <IoIosAddCircle />
                      </span>
                    </button>
                    <button className="text-red-500 transition hover:text-red-600 text-md bg-red-300 rounded-lg p-1 slowhover pr-2 pl-2 flex items-center gap-2 justify-center">
                      Delete{" "}
                      <span className="text-xl">
                        <MdDeleteForever />
                      </span>
                    </button>
                  </div>
                </li>
                <li className="flex items-center gap-4 bg-gray-100 p-5 rounded-lg mb-[10px]">
                  <div className=" flex items-center h-full overflow-hidden rounded-full bg-gray-200">
                    <img
                      //   src={"http://127.0.0.1:8000" + i.sender.pfp}
                      src="https://images.unsplash.com/photo-1722518805100-f17276502925?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw5fHx8ZW58MHx8fHx8"
                      alt="pfp"
                      className="size-11 rounded object-cover"
                    />
                  </div>

                  <div>
                    <h3 className="text-md text-black font-semibold">
                      {/* {i.sender.first_name} {i.sender.last_name} */}
                      jdnwed doiewhd
                    </h3>

                    <dl className="mt-0.5 space-y-px text-sm text-gray-600 font-medium">
                      <div>
                        {/* <dd className="inline">@{i.sender.username}</dd> */}
                        <dd className="inline">@kdnwekdn</dd>
                      </div>
                    </dl>
                  </div>

                  <div className="flex flex-1 items-center justify-end gap-2">
                    <button
                      className="text-blue-500 transition hover:text-blue-600 text-md bg-blue-300 rounded-lg p-1 slowhover pr-2 pl-2 flex items-center gap-2 justify-center"
                      onClick={() => {
                        // respond_request(i.sender.username, "yes");
                      }}>
                      Accept
                      <span className="text-xl">
                        <IoIosAddCircle />
                      </span>
                    </button>
                    <button className="text-red-500 transition hover:text-red-600 text-md bg-red-300 rounded-lg p-1 slowhover pr-2 pl-2 flex items-center gap-2 justify-center">
                      Delete{" "}
                      <span className="text-xl">
                        <MdDeleteForever />
                      </span>
                    </button>
                  </div>
                </li>
              </ul>
            </div>
            {/* Modal footer */}
            <div className="flex items-center justify-end p-4 md:p-5 border-gray-200 rounded-b ">
              <button
                data-modal-hide="static-modal"
                type="button"
                className="text-blue-500 transition hover:text-blue-600 text-md bg-blue-300 rounded-lg p-2 slowhover pr-3 pl-3 flex items-center gap-2 justify-center mr-3">
                Accept All
              </button>
              <button
                data-modal-hide="static-modal"
                type="button"
                className="text-red-500 transition hover:text-red-600 text-md bg-red-300 rounded-lg p-2 slowhover pr-3 pl-3 flex items-center gap-2 justify-center">
                Decline
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <section className="w-[30vw]">
      <div className="p-5 m-3 rounded-lg text-black shadow-sm shadow-indigo-100 bg-white">
        <div className="">
          <header className="text-left">
            <h1 className="text-2xl font-bold text-black">
              Recent Requests{" "}
              <span className="text-gray-600 font-normal text-md">
                ({totalFrs})
              </span>
            </h1>
          </header>

          {totalFrs == 0 ? (
            <span>No Current Requests</span>
          ) : (
            <div className="mt-8">
              <ul className="space-y-4">
                {fr?.slice(0, NumFr).map((i) => {
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
                        <button
                          className="text-blue-500 transition hover:text-blue-600 text-2xl bg-blue-300 rounded-full p-1 slowhover"
                          onClick={() => {
                            respond_request(i.sender.username, "yes");
                          }}>
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
                <button
                  className=" text-blue-600 bg-blue-200 p-2 pr-3 pl-3 rounded-lg w-full  hover:bg-blue-600 hover:text-white slowhover flex justify-center items-center gap-2"
                  onClick={() => {
                    setfullscreen(true);
                  }}>
                  Show All Requests
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default FriendRequests;
