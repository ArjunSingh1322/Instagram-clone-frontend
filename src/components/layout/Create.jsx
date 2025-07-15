
// import React, { useState } from "react";
// import api from "../../services/Api";
// import { useNavigate } from "react-router-dom";
// import Navbar from "./Navbar";

// const Create = () => {
//   let [caption, setCaption] = useState("");
//   let [file, setFile] = useState(null);
//   let [loading, setLoading] = useState(false);
//   let [isUploaded, setIsUploaded] = useState(false); 
//   let [ApiError,SetApiError] = useState("")
//   let nevigate = useNavigate()

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     api
//       .post("/post/create", { text: caption, image: file })
//       .then((res) => {
//         console.log("Post created:", res.data);
//          if(res){
//        nevigate("/")
//       }
//       })
//       .catch((err) => {
//         console.error("Error creating post:", err);
//       });
     
// // console.log(caption)
//     setCaption("");
//     setFile(null);
//     setIsUploaded(false); // Reset upload status
//   };

//   function handleimagechange(e) {
//     const selectedFile = e.target.files[0];
//     setFile(selectedFile);

//     if (selectedFile) {
//       const formData = new FormData();
//       formData.append("file", selectedFile);
//       setLoading(true);
//       setIsUploaded(false);

//       api
//         .post("/post/upload", formData, {
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//         })
//         .then((res) => {
//           console.log(res.data);
//           setFile(res.data.data.file_url);
//           setIsUploaded(true); 
//           setLoading(false);
//         })
//         .catch((err) => {
//           console.log(err);
//           setLoading(false);
//           setIsUploaded(false); 
//           SetApiError("Request Faild to upload")
//         });
//     }
//   }

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-[#fafafa] px-4">
//       <Navbar/>
      
//       <form
//         onSubmit={handleSubmit}
//         className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md border border-gray-200"
//       >
//         <h2 className="text-3xl font-bold mb-6 text-center font-sans text-gray-800">
//           Create New Post
//         </h2>

//         {/* Image Upload */}
//         <label className="block mb-4">
//           <span className="text-sm font-medium text-gray-700">Choose image</span>
//           <input
//             type="file"
//             accept="image/*"
//             onChange={(e) => handleimagechange(e)}
//             className="mt-2 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4
//               file:rounded-full file:border-0
//               file:text-sm file:font-semibold
//               file:bg-black file:text-white
//               hover:file:bg-gray-800"
//           />
//         </label>

//         {/* Caption Input */}
//         <label className="block mb-6">
//           <span className="text-sm font-medium text-gray-700">Caption</span>
//           <textarea
//             value={caption}
//             onChange={(e) => setCaption(e.target.value)}

//             placeholder="Write a caption..."
//             rows="3"
//             className="mt-2 w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-800 resize-none"
//           />
//         </label>

//         {/* Submit Button */}
//     {/* Submit Button */}  
// {ApiError && (
//   <p className="text-red-500 text-sm mb-4 text-center">{ApiError}</p>
// )}
// <button
//   type="submit"
//   disabled={loading || !isUploaded}
//   className={`w-full py-3 rounded-xl text-lg font-semibold transition ${
//     loading || !isUploaded
//       ? "bg-gray-300 text-gray-500 cursor-not-allowed"
//       : "bg-black text-white hover:bg-gray-800"
//   }`}
// >
//   {loading ? "Uploading..." : "Share"}
// </button>

//       </form>
//     </div>
//   );
// };

// export default Create;







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
    <div className="min-h-screen bg-[#fafafa] flex flex-col">
      {/* Navbar */}
      <div className="sticky top-0 z-50 bg-white shadow-sm">
        <Navbar />
      </div>

      {/* Form Container */}
      <div className="flex-grow flex justify-center items-start sm:items-center px-4 py-6 sm:py-10">
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-lg rounded-xl p-5 sm:p-6 w-full max-w-sm sm:max-w-md border border-gray-200"
        >
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center text-gray-800">
            Create New Post
          </h2>

          {/* Image Upload */}
          <label className="block mb-4">
            <span className="text-sm font-medium text-gray-700">Choose image</span>
            <input
              type="file"
              accept="image/*"
              onChange={handleimagechange}
              className="mt-2 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4
                file:rounded-full file:border-0
                file:text-sm file:font-semibold
                file:bg-black file:text-white
                hover:file:bg-gray-800"
            />
          </label>

          {/* Caption */}
          <label className="block mb-4">
            <span className="text-sm font-medium text-gray-700">Caption</span>
            <textarea
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              placeholder="Write a caption..."
              rows="3"
              className="mt-2 w-full p-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-800 resize-none"
            />
          </label>

          {/* Error */}
          {ApiError && (
            <p className="text-red-500 text-sm mb-4 text-center">{ApiError}</p>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading || !isUploaded}
            className={`w-full py-3 rounded-lg text-base font-semibold transition ${
              loading || !isUploaded
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-black text-white hover:bg-gray-800"
            }`}
          >
            {loading ? "Uploading..." : "Share"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Create;
