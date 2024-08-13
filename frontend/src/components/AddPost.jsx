import React, { useState, useContext, useEffect } from "react";
import { MyContext } from "../MyContext";

import { BiImageAdd } from "react-icons/bi";
import { MdDelete } from "react-icons/md";

import api from "../api";

function AddPost(props) {
  const { me } = useContext(MyContext);
  const [selectedFile, setSelectedFile] = useState(null);
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [previewUrl, setPreviewUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  // Handle file selection and set preview
  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setSelectedFile(file);

      // Create a URL for the selected image to display as a preview
      const fileUrl = URL.createObjectURL(file);
      setPreviewUrl(fileUrl);
    }
  };

  // Trigger the file input click event
  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleFileButtonClick = () => {
    document.getElementById("fileInput").click();
  };

  // Clear form inputs and state
  const clearForm = () => {
    setPreviewUrl(null);
    setSelectedFile(null);
    setDesc("");
    setTitle("");
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("desc", desc);
    selectedFile ? formData.append("image", selectedFile) : null;

    try {
      const response = await api.post("api/addpost", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Post added successfully:", response.data);
      clearForm();
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to add post");
    } finally {
      setLoading(false);
      props.posts_refresh();
    }
  };

  return (
    <div
      role="alert"
      className="rounded-xl border border-gray-100 bg-white p-4 h-fit w-full mb-6">
      <form
        method="post"
        className="flex items-start gap-4"
        onSubmit={handleSubmit}>
        <span className="w-10">
          <img
            src={"http://127.0.0.1:8000" + me?.pfp}
            alt=""
            className="size-10 rounded-full object-cover"
          />
        </span>

        <div className="flex-1">
          <strong className="block font-medium text-gray-900">
            What's on your mind?
          </strong>

          <div>
            <textarea
              id="desc"
              placeholder="Share Something..."
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm text-black pl-2"
            />
          </div>
          <div>
            <input
              type="text"
              id="title"
              placeholder="Give it a Title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
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
              className="p-2 pr-3 pl-3 rounded-lg flex justify-center items-center gap-2 bg-blue-100 text-blue-500 slowhover hover:bg-blue-300 hover:text-blue-700">
              {loading ? "Adding..." : "Add Post"}
            </button>

            <input
              type="file"
              id="fileInput"
              accept="image/*"
              onChange={(e) => {
                handleImageChange(e);
                handleFileChange(e);
              }}
              style={{ display: "none" }} // Hide the default file input
            />
            <button
              type="button"
              onClick={handleFileButtonClick}
              className="text-black p-2 pr-3 pl-3 rounded-lg w-fit flex justify-center items-center gap-2 hover:bg-gray-200 hover:text-black slowhover">
              Add an image
              <span className="text-xl">
                <BiImageAdd />
              </span>
            </button>

            {(title || desc || previewUrl) && (
              <button
                type="button"
                onClick={clearForm}
                className="text-red-400 p-2 pr-3 pl-3 rounded-lg w-fit flex justify-center items-center gap-2 hover:bg-red-200 hover:text-red-500 slowhover">
                Clear
                <span className="text-lg">
                  <MdDelete />
                </span>
              </button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}

export default AddPost;
