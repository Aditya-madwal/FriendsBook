import React from "react";
import { MyContext } from "../MyContext";
import { useContext } from "react";
import { BiImageAdd } from "react-icons/bi";

function AddPost() {
  const { me, setMe } = useContext(MyContext);
  return (
    <div
      role="alert"
      className="rounded-xl border border-gray-100 bg-white p-4 h-fit w-full mb-6">
      <div className="flex items-start gap-4">
        <span className=" w-10 ">
          <img
            src={"http://127.0.0.1:8000" + me?.pfp}
            alt=""
            className="size-10 rounded-full object-cover"
          />
        </span>

        <div className="flex-1">
          <strong className="block font-medium text-gray-900">
            What's in your mind ?
          </strong>

          <div>
            <textarea
              type="email"
              id="UserEmail"
              placeholder="Share Something..."
              className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm text-black pl-2"
            />
          </div>

          <div className="mt-4 flex gap-2">
            <button className=" p-2 pr-3 pl-3 rounded-lg flex justify-center items-center gap-2 bg-blue-600 text-white slowhover">
              Add Post
            </button>
            <button className=" text-black  p-2 pr-3 pl-3 rounded-lg w-fit flex justify-center items-center gap-2 hover:bg-gray-500 hover:text-white slowhover">
              Add an image
              <span className="text-xl">
                <BiImageAdd />
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddPost;
