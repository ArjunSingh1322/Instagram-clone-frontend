





import React, { useState, useEffect, useContext } from 'react';
import Navbar from '../components/layout/Navbar';
import { Heart, MessageCircle, Send, Bookmark } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import api from '../services/Api';
import { usercontext } from '../components/layout/Context';

const mockStories = [
  {
    id: 1,
    username: 'travel_enthusiast',
    userImage: 'https://randomuser.me/api/portraits/women/44.jpg',
    hasStory: true,
    viewed: false
  },
  {
    id: 2,
    username: 'foodie_adventures',
    userImage: 'https://randomuser.me/api/portraits/men/32.jpg',
    hasStory: true,
    viewed: true
  },
  {
    id: 3,
    username: 'photography_pro',
    userImage: 'https://randomuser.me/api/portraits/women/68.jpg',
    hasStory: true,
    viewed: false
  },
  {
    id: 4,
    username: 'fitness_guru',
    userImage: 'https://randomuser.me/api/portraits/men/75.jpg',
    hasStory: true,
    viewed: false
  },
  {
    id: 5,
    username: 'art_lover',
    userImage: 'https://randomuser.me/api/portraits/women/25.jpg',
    hasStory: true,
    viewed: true
  }
];

const HomePage = () => {
  const [data, setdata] = useState([]);
  const [likes,setLikes] = useState("")
  const navigate = useNavigate();
  const { username } = useContext(usercontext);
  const [flag,setflag] = useState(false)

  useEffect(() => {
    if (!localStorage.getItem("userToken")) {
      navigate("/signin");
    } else {
      api.get("/post/feed")
        .then(res => setdata(res.data.data))
        .catch(err => console.error("API Error:", err));
    }
  }, []);

  function handleLikeClick(id){
    api.post(`/post/like/${id}`)
      .then(() => {
        api.get("/post/feed")
          .then(res => setdata(res.data.data))
          .catch(err => console.error("Error refreshing feed:", err));
      })
      .catch(err => {
        api.post(`/post/unlike/${id}`)
          .then(() => {
            api.get("/post/feed")
              .then(res => setdata(res.data.data))
              .catch(err => console.error("Error refreshing feed after unlike:", err));
          })
          .catch(err => console.error("Unlike failed:", err));
      });
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />

      <div className="flex justify-center px-4 pb-4">
        <div className="w-full md:w-[600px]">
          {/* Stories */}
          <div className="bg-white border border-gray-200 rounded-lg mb-6 p-4 overflow-x-auto">
            <div className="flex space-x-4">
              <div className="flex flex-col items-center space-y-1">
                <div className="relative">
                  <div className="w-16 h-16 rounded-full border-2 border-gray-200 p-0.5" />
                  <div className="absolute bottom-0 right-0 bg-blue-500 rounded-full p-1 border-2 border-white">
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </div>
                </div>
                <span className="text-xs">Your story</span>
              </div>

              {mockStories.map((story) => (
                <div key={story.id} className="flex flex-col items-center space-y-1">
                  <div className={`w-16 h-16 rounded-full border-2 p-0.5 ${story.viewed ? 'border-gray-300' : 'border-gradient-instagram'}`}>
                    <img
                      src={story.userImage}
                      alt={username}
                      className="w-full h-full rounded-full object-cover"
                    />
                  </div>
                  <span className="text-xs truncate w-16 text-center">{story.username}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Posts */}
          {data.map((post) => (
            <div key={post._id} className="bg-white border border-gray-200 rounded-lg mb-6">
              <div className="flex items-center p-3 border-b border-gray-200">
                <img 
                  src="https://m.media-amazon.com/images/I/51FFY8JKggL.jpg" 
                  alt={post.username}
                  className="w-8 h-8 rounded-full object-cover mr-3"
                />
                <span className="font-semibold text-sm">{post.user.name}</span>
              </div>

              <img 
                src={post.image} 
                alt={post.text}
                className="w-full object-cover"
              />

              {/* Caption with border styling */}
              <div className="mx-0 mt-2 mb-0 border border-gray-200 rounded-lg px-4 py-2 bg-white shadow-sm">
                <p className="text-sm text-gray-800 leading-snug">
                  <span className="font-semibold mr-0">{post.username}</span>
                  {post.text}
                </p>
              </div>

              <div className="p-3">
                <div className="flex space-x-4 mb-2">
                  <button onClick={() => handleLikeClick(post._id)}>🤍{post.likesCount}</button> 
                  <MessageCircle className="text-gray-800" size={24} />
                  <Send className="text-gray-800" size={24} />
                  <Bookmark className="ml-auto text-gray-800" size={24} />
                </div>

                <p className="text-sm mb-1">
                  <span className="font-semibold mr-1">{post.username}</span>
                  {post.caption}
                </p>
                <button className="text-gray-500 text-sm mb-1">
                  View all {post.comments} comments
                </button>
                <p className="text-gray-400 text-xs uppercase">{post.timestamp}</p>
              </div>

              <div className="border-t border-gray-200 p-3 flex">
                <input
                  type="text"
                  placeholder="Add a comment..."
                  className="flex-1 text-sm focus:outline-none"
                />
                <button className="text-blue-500 font-semibold text-sm">Post</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;




