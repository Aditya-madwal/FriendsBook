import React from "react";
import { MdDeleteOutline } from "react-icons/md";
import { IoAddCircleOutline } from "react-icons/io5";
import { IoIosAddCircle } from "react-icons/io";
import { MdDeleteForever } from "react-icons/md";
import { FaArrowRight } from "react-icons/fa";

function FriendRequests() {
  return (
    <section className="w-[30vw]">
      <div className="p-5 m-3 rounded-lg text-black shadow-sm shadow-indigo-100 bg-white">
        <div className="">
          <header className="text-left">
            <h1 className="text-2xl font-bold text-black">Recent Requests</h1>
          </header>

          <div className="mt-8">
            <ul className="space-y-4">
              <li className="flex items-center gap-4">
                <div className=" flex items-center h-full overflow-hidden rounded-full bg-gray-200">
                  <img
                    src="https://images.unsplash.com/photo-1721925376073-4d2c53dd12f2?q=80&w=1886&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt=""
                    className="size-11 rounded object-cover"
                  />
                </div>

                <div>
                  <h3 className="text-sm text-black font-semibold">
                    lnjksndjn dnejend
                  </h3>

                  <dl className="mt-0.5 space-y-px text-[10px] text-gray-600 font-medium">
                    <div>
                      <dd className="inline">@dlkndj</dd>
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
              <li className="flex items-center gap-4">
                <div className=" flex items-center h-full overflow-hidden rounded-full bg-gray-200">
                  <img
                    src="https://images.unsplash.com/photo-1721925376073-4d2c53dd12f2?q=80&w=1886&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt=""
                    className="size-11 rounded object-cover"
                  />
                </div>

                <div>
                  <h3 className="text-sm text-black font-semibold">
                    lnjksndjn dnejend
                  </h3>

                  <dl className="mt-0.5 space-y-px text-[10px] text-gray-600 font-medium">
                    <div>
                      <dd className="inline">@dlkndj</dd>
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
              <li className="flex items-center gap-4">
                <div className=" flex items-center h-full overflow-hidden rounded-full bg-gray-200">
                  <img
                    src="https://images.unsplash.com/photo-1721925376073-4d2c53dd12f2?q=80&w=1886&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt=""
                    className="size-11 rounded object-cover"
                  />
                </div>

                <div>
                  <h3 className="text-sm text-black font-semibold">
                    lnjksndjn dnejend
                  </h3>

                  <dl className="mt-0.5 space-y-px text-[10px] text-gray-600 font-medium">
                    <div>
                      <dd className="inline">@dlkndj</dd>
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
            </ul>

            <div className="flex justify-end pt-2 mt-3">
              <button className=" text-blue-600 bg-blue-200 p-2 pr-3 pl-3 rounded-lg w-full flex justify-center items-center gap-2 hover:bg-blue-600 hover:text-white slowhover">
                Show All Requests <FaArrowRight />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default FriendRequests;
