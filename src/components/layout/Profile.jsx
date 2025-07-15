

import React, { useState, useEffect, useContext } from "react";
import api from "../../services/Api";
import Navbar from "./Navbar";
import { usercontext } from "./Context";
import { Heart, MessageCircle, Send, Bookmark } from 'lucide-react';

const Profile = () => {
  const [data, setdata] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [activePost, setActivePost] = useState(null);
  const [loading, setLoading] = useState(false);
  const [profile, setprofile] = useState("");
  const [caption, setCaption] = useState("");
  const [bio, setbio] = useState("");
  const [bioflag, setbioflag] = useState(false);
  const [usernameFlag, setUsernameFlag] = useState(false);

  const { username, setUsername } = useContext(usercontext);
  const [updatedName, setUpdatedName] = useState("");
  const [flag, setFlag] = useState(true)
  console.log("hello", username)

  useEffect(() => {
    api
      .get("/post/my-posts")
      .then((res) => {
        setdata(res.data.data.reverse());
        setCaption(res.data.data.text);
      })
      .catch((err) => console.log(err));
  }, []);

  function postmodal(post) {
    setActivePost(post);
    setModalOpen(true);
  }

  function closeModal() {
    setModalOpen(false);
    setActivePost(null);
  }

  function handleEdit() {
    console.log("Edit post:", activePost);
  }

  function handleDelete(id) {
    setLoading(true);
    api
      .delete(`/post/delete/${id}`)
      .then(() => {
        setdata((prevData) => prevData.filter((post) => post._id !== id));
        closeModal();
      })
      .catch((err) => {
        console.error("Delete failed:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  function editprofile() {
    setUsernameFlag(true);
  }

  function handleLikeClick(id) {
    api.post(`/post/like/${id}`)
      .then(() => {
        api.get("/post/my-posts")
          .then(res => setdata(res.data.data))
          .catch(err => console.error("Error refreshing feed:", err));

      })
      .catch(err => {
        api.post(`/post/unlike/${id}`)
          .then(() => {
            api.get("/post/my-posts")
              .then(res => setdata(res.data.data))
              .catch(err => console.error("Error refreshing feed after unlike:", err));
          })
          .catch(err => console.error("Unlike failed:", err));
      });
    if (flag) setFlag(false)
    else setFlag(true)
  }


  return (
    <div className="max-w-5xl mx-auto px-4 py-8 relative">
      <Navbar />


      <div className="flex flex-col md:flex-row items-center md:items-start md:gap-16 mb-10">
        <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden">
          <img
            src="https://media.istockphoto.com/id/1332100919/vector/man-icon-black-icon-person-symbol.jpg?s=612x612&w=0&k=20&c=AVVJkvxQQCuBhawHrUhDRTCeNQ3Jgt0K1tXjJsFy1eg="
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="mt-6 md:mt-0 flex-1">
          <div className="flex flex-col md:flex-row items-center gap-4 mb-4">


            {usernameFlag ? (
              <div className="flex gap-3 items-center">
                <input
                  type="text"
                  // value={username}
                  onChange={(e) => setUpdatedName(e.target.value)}
                  className="border px-2 py-1 rounded text-sm"
                />
                <button
                  className="bg-blue-500 text-white text-sm px-3 py-1 rounded hover:bg-blue-600 transition"
                  onClick={() => {
                    api
                      .put("/user/profile", {
                        name: updatedName,
                      })
                      .then((res) => {

                        console.log('newname', res.data.data.name)
                        setUsernameFlag(false);
                        setUsername(res.data.data.name)
                        localStorage.setItem("username", res.data.data.name)

                      })
                      .catch((err) => {
                        console.error("Error updating username:", err);
                      });
                  }}
                >
                  Save Username
                </button>
              </div>
            ) : (
              <div className="flex gap-4 items-center">
                <h2 className="text-2xl font-light">{username}</h2>
                <button
                  className="border px-4 py-1 rounded text-sm font-medium hover:bg-gray-100"
                  onClick={editprofile}
                >
                  Edit Profile
                </button>
              </div>
            )}

          </div>

          <div className="flex gap-6 text-sm md:text-base mb-4">
            <div>
              <span className="font-semibold">{data.length}</span> posts
            </div>
          </div>

          <div>
            <p className="font-semibold">{username}</p>

          </div>
        </div>
      </div>

      {/* Post Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 border-t pt-6">
        {data.map((post, index) => (
          <div key={index} className="">
            <div className="aspect-square overflow-hidden">
              <img
                src={post.image}
                alt={`Post ${index + 1}`}
                onClick={() => postmodal(post)}
                className="w-full h-full object-cover hover:opacity-50 transition"
              />
            </div>

            {/* Buttons below post */}
            <div className="flex items-center justify-between px-1 py-2">
              <div className="flex items-center gap-3">
                <button onClick={() => handleLikeClick(post._id)} className="text-sm">
                  {flag ?"❤️":"🤍"} {post.likesCount}
                </button>
                <MessageCircle className="text-gray-800" size={20} />
                <Send className="text-gray-800" size={20} />
              </div>
              <Bookmark className="text-gray-800" size={20} />
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {modalOpen && activePost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-white/10">
          <div className="bg-white rounded-xl w-full max-w-md mx-4">
            <div className="w-full h-64 overflow-hidden rounded-t-xl">
              <img
                src={activePost.image}
                alt="Post"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="p-4">
              <div className="flex justify-end mb-2">
                <button
                  onClick={closeModal}
                  className="text-gray-500 text-sm hover:text-black"
                >
                  Close
                </button>
              </div>

              <p className="text-sm text-gray-800 mb-4">{activePost.text}</p>

              <div className="flex justify-around text-sm font-medium text-gray-700 border-t pt-3">
                <button
                  onClick={handleEdit}
                  className="hover:text-black transition"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(activePost._id)}
                  className={`transition ${loading
                    ? "text-gray-400 cursor-not-allowed"
                    : "hover:text-red-600"
                    }`}
                  disabled={loading}
                >
                  {loading ? "Deleting..." : "Delete"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
