import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import "../../index.css"

function Navbar() {
  const navigate = useNavigate()

  function handle() {
    localStorage.removeItem("userToken")
    navigate("/login")
  }

  const buttonClasses = "text-gray-600 hover:text-gray-700 px-4 py-1 rounded-full transition"

  return (
    <nav className="px-3 py-3">
      <div className="flex items-center justify-between">
        <Link to="/" className="text-3xl font-semibold font-[cursive]">Instagram</Link>

        <div className="flex space-x-4 items-center">
          <Link to="/" className={buttonClasses}>Home</Link>
          <Link to="/Create" className={buttonClasses}>Create</Link>
          <Link to="/profile" className={buttonClasses}>Profile</Link>
          <button onClick={handle} className={buttonClasses}>Logout</button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
