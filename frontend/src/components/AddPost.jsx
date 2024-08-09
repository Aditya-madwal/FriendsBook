import React from "react";
import { MyContext } from "../MyContext";
import { useContext } from "react";
import { BiImageAdd } from "react-icons/bi";
import { useState, useEffect } from "react";
import api from "../api";

function AddPost() {
  const { me, setMe } = useContext(MyContext);
  const [selectedFile, setSelectedFile] = useState(null);
  const [title, settitle] = useState(null);
  const [desc, setdesc] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setSelectedFile(file);

      // Create a URL for the selected image to display as a preview
      const fileUrl = URL.createObjectURL(file);
      setPreviewUrl(fileUrl);
    }
  };
  const handleButtonClick = () => {
    document.getElementById("fileInput").click();
  };

  const clearform = () => {
    setPreviewUrl(null);
    setSelectedFile(null);
    setdesc(null);
    settitle(null);
  };

  const handleAddPost = async (e) => {
    setLoading(true);
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("desc", desc);
      formData.append("image", selectedFile);

      try {
        const response = await api.post("api/addpost", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      } catch (error) {
        console.error("Error:", error);
      }

      const res = await api.post("api/addpost", {
        title,
        desc,
        selectedFile,
      });
      clearform();
    } catch (error) {
      alert(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div
      role="alert"
      className="rounded-xl border border-gray-100 bg-white p-4 h-fit w-full mb-6">
      <form
        method="post"
        className="flex items-start gap-4"
        onSubmit={handleAddPost}>
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
              type="text"
              id="desc"
              placeholder="Share Something..."
              value={desc}
              onChange={(e) => setdesc(e.target.value)}
              className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm text-black pl-2"
            />
          </div>
          <div>
            <input
              type="text"
              id="title"
              placeholder="Give it a Title..."
              value={title}
              onChange={(e) => settitle(e.target.value)}
              className="mt-1 w-full h-10 rounded-md border-gray-200 shadow-sm sm:text-sm text-black pl-2"
            />
          </div>

          {previewUrl && (
            <div className="image-preview mt-4">
              <img
                className="mt-2 w-full h-full rounded-md border-gray-200 shadow-sm sm:text-sm text-black"
                src={previewUrl}
                alt="Selected Image"
              />
            </div>
          )}

          <div className="mt-4 flex gap-2">
            <button
              type="submit"
              className=" p-2 pr-3 pl-3 rounded-lg flex justify-center items-center gap-2 bg-blue-100 text-blue-500 slowhover hover:bg-blue-300 hover:text-blue-700">
              Add Post
            </button>
            {/* preview + image input -----------------*/}
            <input
              type="file"
              id="fileInput"
              accept="image/*"
              onChange={handleFileChange}
              style={{ display: "none" }} // Hide the default file input
            />
            <button
              onClick={handleButtonClick}
              className=" text-black  p-2 pr-3 pl-3 rounded-lg w-fit flex justify-center items-center gap-2 hover:bg-gray-200 hover:text-black slowhover">
              Add an image
              <span className="text-xl">
                <BiImageAdd />
              </span>
            </button>
            {title || desc || previewUrl || previewUrl ? (
              <button
                onClick={() => clearform()}
                className=" text-red-400  p-2 pr-3 pl-3 rounded-lg w-fit flex justify-center items-center gap-2 hover:bg-red-200 hover:text-red-500 slowhover">
                Clear
                <span className="text-xl">
                  <BiImageAdd />
                </span>
              </button>
            ) : null}

            {/* ----------------- preview */}
          </div>
        </div>
      </form>
    </div>
  );
}

export default AddPost;
