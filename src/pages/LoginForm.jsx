import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [user,setuser] = useState(null)

  let navigate = useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // Basic validation
    if (!email || !password) {
      setError("Please fill in all fields.");
      setIsLoading(false);
      return;
    }

    try {
      // API call to backend
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      setuser(data.data.token)
      if (response.ok) {
        // Save token or user info to localStorage if needed
        localStorage.setItem("userToken", data.data.token);
        localStorage.setItem("username",data.data.name)
        navigate("/");
      } else {
        setError(data.message || "Invalid email or password.");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <div className="bg-white p-8 sm:p-10 rounded-lg border border-gray-300 w-full max-w-sm">
        <div className="flex justify-center mb-8">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
            className="h-12 w-12 text-pink-600"
          >
            <path
              fill="currentColor"
              d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"
            />
          </svg>
        </div>

        {error && (
          <div className="mb-4 p-2 text-center text-sm text-white bg-red-500 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="email"
              className="w-full px-3 py-2 text-sm bg-gray-50 border border-gray-300 rounded focus:outline-none focus:border-gray-400"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
            />
          </div>

          <div>
            <input
              type="password"
              className="w-full px-3 py-2 text-sm bg-gray-50 border border-gray-300 rounded focus:outline-none focus:border-gray-400"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-1.5 text-sm font-medium text-white rounded ${
              isLoading ? "bg-blue-300" : "bg-blue-500 hover:bg-blue-600"
            } transition`}
          >
            {isLoading ? "Logging in..." : "Log In"}
          </button>
        </form>

        <div className="flex items-center my-4">
          <div className="flex-grow border-t border-gray-300"></div>
          <div className="mx-4 text-sm text-gray-500">OR</div>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>

        <div className="text-center mt-4">
          <a href="/signin" className="text-xs text-blue-500 font-medium">
            Sign up
          </a>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
