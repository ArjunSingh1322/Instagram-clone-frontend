
import React, { useState } from "react";
import api from "../../services/Api";
import { useNavigate } from "react-router-dom";

const Create = () => {
  let [caption, setCaption] = useState("");
  let [file, setFile] = useState(null);
  let [loading, setLoading] = useState(false);
  let [isUploaded, setIsUploaded] = useState(false); // Track upload success
  let nevigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault();

    api
      .post("/post/create", { caption: caption, image: file })
      .then((res) => {
        console.log("Post created:", res.data);
         if(res){
       nevigate("/")
      }
      })
      .catch((err) => {
        console.error("Error creating post:", err);
      });
     

    setCaption("");
    setFile(null);
    setIsUploaded(false); // Reset upload status
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
          console.log(res.data);
          setFile(res.data.data.file_url);
          setIsUploaded(true); 
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
          setIsUploaded(false); 
        });
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#fafafa] px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md border border-gray-200"
      >
        <h2 className="text-3xl font-bold mb-6 text-center font-sans text-gray-800">
          Create New Post
        </h2>

        {/* Image Upload */}
        <label className="block mb-4">
          <span className="text-sm font-medium text-gray-700">Choose image</span>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleimagechange(e)}
            className="mt-2 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4
              file:rounded-full file:border-0
              file:text-sm file:font-semibold
              file:bg-black file:text-white
              hover:file:bg-gray-800"
          />
        </label>

        {/* Caption Input */}
        <label className="block mb-6">
          <span className="text-sm font-medium text-gray-700">Caption</span>
          <textarea
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            placeholder="Write a caption..."
            rows="3"
            className="mt-2 w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-800 resize-none"
          />
        </label>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading || !isUploaded}
          className={`w-full py-3 rounded-xl text-lg font-semibold transition ${
            loading || !isUploaded
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-black text-white hover:bg-gray-800"
          }`}
        >
          {loading ? "Uploading..." : "Share"}
        </button>
      </form>
    </div>
  );
};

export default Create;
