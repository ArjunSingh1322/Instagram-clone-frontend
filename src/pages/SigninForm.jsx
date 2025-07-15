

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignInForm = () => {
  const navigate = useNavigate();
  const [token,settoken] = useState()
  const[username,setusername] = useState("")

  console.log("user token",token)

  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }
    setusername(formData.name)


    if (!formData.mobile.trim()) {
      newErrors.mobile = "Mobile number is required";
    } else if (!/^[6-9]\d{9}$/.test(formData.mobile)) {
      newErrors.mobile = "Enter a valid 10-digit Indian mobile number";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)) {
      newErrors.email = "Enter a valid email address";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validate()) {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/auth/signup`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    name: formData.name,
    // mobile: formData.mobile,
    email: formData.email,
    password: formData.password
  })
});

        if (response.ok) {
          const data = await response.json();
          settoken(data.data.token)
          localStorage.setItem("userToken",data.data.token)
          localStorage.setItem("username",data.data.name)
          console.log("Signup successful:", data);

          // Optionally show a success message
          alert("Signup successful!");
          navigate("/");
        } else {
          const errorData = await response.json();
          console.error("Signup failed:", errorData);

          if (errorData.message) {
            alert(`Signup error: ${errorData.message}`);
          } else {
            alert("Signup failed. Please try again.");
          }
        }
      } catch (error) {
        console.error("Signup request error:", error);
        alert("Something went wrong. Please try again later.");
      }
    } else {
      console.log("Form has errors");
    }
  };

  const inputStyle = (field) =>
    `w-full px-3 py-2 text-sm bg-gray-50 border rounded focus:outline-none ${
      errors[field]
        ? "border-red-500 ring-1 ring-red-300 bg-red-50"
        : "border-gray-300 focus:border-gray-400"
    }`;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <div className="bg-white p-8 sm:p-10 rounded-lg border border-gray-300 w-full max-w-sm">
        <div className="flex justify-center mb-8">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="h-12 w-12 text-pink-600">
            <path
              fill="currentColor"
              d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"
            />
          </svg>
        </div>

        <p className="text-center text-gray-500 font-medium mb-6">
          Sign up to see photos and videos from your friends.
        </p>

        {Object.keys(errors).length > 0 && (
          <div className="mb-4 p-2 text-center text-sm text-white bg-red-500 rounded">
            Please fix the errors in the form
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={inputStyle("name")}
              placeholder="Full Name"
            />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
          </div>

          <div>
            <input
              type="text"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              className={inputStyle("mobile")}
              placeholder="Mobile Number"
            />
            {errors.mobile && <p className="text-red-500 text-xs mt-1">{errors.mobile}</p>}
          </div>

          <div>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={inputStyle("email")}
              placeholder="Email"
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          </div>

          <div>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={inputStyle("password")}
              placeholder="Password"
            />
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
          </div>

          <div>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={inputStyle("confirmPassword")}
              placeholder="Confirm Password"
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-1.5 text-sm font-medium text-white rounded bg-blue-500 hover:bg-blue-600 transition"
          >
            Sign Up
          </button>
          <div className="mt-4">
          <button
          type="button"
          onClick={() => navigate("/login")}
          className="w-full py-2 text-sm font-semibold text-green  hover:bg-gray-200 hover:text-black transition duration-200
"
  >
    Log In
  </button>
</div>
        </form>
      </div>
    </div>
  );
};

export default SignInForm;
