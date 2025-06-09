
import React, { useState, useEffect } from "react";
import api from "../../services/Api";
import Navbar from "./Navbar";


const Profile = () => {
  const [data, setdata] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [activePost, setActivePost] = useState(null);
  const [loading, setLoading] = useState(false); 
  const[profile,setprofile] = useState("")

  useEffect(() => {
    api.get("/post/my-posts")
      .then(res => {
        setdata(res.data.data.reverse());
      })
      .catch(err => console.log(err));
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
    // navigate or open a form
  }

  function handleDelete(id) {
    setLoading(true);
    api.delete(`/post/delete/${id}`)
      .then(() => {
        setdata(prevData => prevData.filter(post => post._id !== id));
        closeModal();
      })
      .catch(err => {
        console.error("Delete failed:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }
function changeprofilephoto(e) {
  const file = e.target.files[0];
  if (file) {
    const url = URL.createObjectURL(file); 
    setprofile(url); 
  }
}
  

  return (
 
    <div className="max-w-5xl mx-auto px-4 py-8 relative">
         <Navbar />
      {/* Profile Header */}
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
            <h2 className="text-2xl font-light">your_username</h2>
            <button className="border px-4 py-1 rounded text-sm font-medium hover:bg-gray-100">   
                Edit profile
           </button>
             
    
          </div>

          <div className="flex gap-6 text-sm md:text-base mb-4">
            <div><span className="font-semibold">{data.length}</span> posts</div>
            <div><span className="font-semibold">120</span> followers</div>
            <div><span className="font-semibold">180</span> following</div>
          </div>

          <div>
            <p className="font-semibold">Your Name</p>
            <p className="text-sm text-gray-700">Just a short bio. 👋</p>
            <a href="https://example.com" className="text-sm text-blue-500">example.com</a>
          </div>
        </div>
      </div>

      {/* Post Grid */}
      <div className="grid grid-cols-3 gap-1 border-t pt-6">
        {data.map((post, index) => (
          <div key={index} className="aspect-square overflow-hidden cursor-pointer">
            <img
              src={post.image}
              alt={`Post ${index + 1}`}
              onClick={() => postmodal(post)}
              className="w-full h-full object-cover hover:opacity-80 transition"
            />
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
                  className={`transition ${
                    loading ? "text-gray-400 cursor-not-allowed" : "hover:text-red-600"
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
