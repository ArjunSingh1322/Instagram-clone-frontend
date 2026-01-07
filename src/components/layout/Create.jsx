

import React, { useState } from "react";
import api from "../../services/Api";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

const Create = () => {
  let [caption, setCaption] = useState("");
  let [file, setFile] = useState(null);
  let [loading, setLoading] = useState(false);
  let [isUploaded, setIsUploaded] = useState(false); 
  let [ApiError, SetApiError] = useState("");
  let nevigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    api
      .post("/post/create", { text: caption, image: file })
      .then((res) => {
        if (res) nevigate("/");
      })
      .catch((err) => {
        console.error("Error creating post:", err);
      });

    setCaption("");
    setFile(null);
    setIsUploaded(false);
  };

  function handleimagechange(e) {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);

    if (selectedFile) {
      const formData = new FormData();
      formData.append("file", selectedFile);
      setLoading(true);
      setIsUploaded(false);

      api
        .post("/post/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          setFile(res.data.data.file_url);
          setIsUploaded(true);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
          setIsUploaded(false);
          SetApiError("Request Failed to upload");
        });
    }
  }

  return (
  <div className="min-h-screen bg-gray-50 flex flex-col">
    
    {/* Navbar */}
    <div className="sticky top-0 z-50 bg-white border-b">
      <Navbar />
    </div>

    {/* Main Container */}
    <div className="flex-grow flex justify-center items-center px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white border rounded-xl shadow-sm"
      >
        {/* Header */}
        <div className="border-b px-4 py-3 text-center">
          <h2 className="text-lg font-semibold text-gray-800">
            Create new post
          </h2>
        </div>

        {/* Image Upload */}
        <div className="p-4">
          <label className="flex flex-col items-center justify-center border-2 border-dashed rounded-lg h-56 cursor-pointer hover:bg-gray-50 transition">
            <span className="text-gray-500 text-sm mb-2">
              Click to upload image
            </span>
            <span className="text-xs text-gray-400">
              JPG, PNG supported
            </span>
            <input
              type="file"
              accept="image/*"
              onChange={handleimagechange}
              className="hidden"
            />
          </label>
        </div>

        {/* Caption */}
        <div className="px-4 pb-4">
          <textarea
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            placeholder="Write a caption..."
            rows="3"
            className="w-full border rounded-lg p-3 text-sm focus:outline-none focus:ring-1 focus:ring-black resize-none"
          />
        </div>

        {/* Error */}
        {ApiError && (
          <p className="text-red-500 text-sm px-4 pb-2 text-center">
            {ApiError}
          </p>
        )}

        {/* Footer Button */}
        <div className="border-t px-4 py-3">
          <button
            type="submit"
            disabled={loading || !isUploaded}
            className={`w-full py-2.5 rounded-lg text-sm font-semibold transition ${
              loading || !isUploaded
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-blue-500 text-white hover:bg-blue-600"
            }`}
          >
            {loading ? "Uploading..." : "Share"}
          </button>
        </div>
      </form>
    </div>
  </div>
);

};

export default Create;
