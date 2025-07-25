
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Navbar() {
  const navigate = useNavigate()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  function handle() {
    localStorage.removeItem("userToken")
    localStorage.removeItem("username")
    navigate("/login")
  }

  const buttonClasses = "text-gray-600 hover:text-gray-700 px-4 py-1 rounded-full transition"

  return (
    <nav className="px-3 py-3">
      <div className="flex items-center justify-between">
        <Link to="/" className="text-3xl font-semibold font-[cursive]">Instagram</Link>

       
        <div className="lg:hidden flex items-center">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-gray-600 hover:text-gray-700 px-4 py-1 rounded-full"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

      
        <div className="hidden lg:flex space-x-4 items-center">
          <Link to="/" className={buttonClasses}>Home</Link>
          <Link to="/Create" className={buttonClasses}>Create</Link>
          <Link to="/profile" className={buttonClasses}>Profile</Link>
          <button onClick={handle} className={buttonClasses}>Logout</button>
        </div>
      </div>

     
      {isMenuOpen && (
        <div className="lg:hidden flex flex-col items-center mt-3 space-y-2">
          <Link to="/" className={buttonClasses}>Home</Link>
          <Link to="/Create" className={buttonClasses}>Create</Link>
          <Link to="/profile" className={buttonClasses}>Profile</Link>
          <button onClick={handle} className={buttonClasses}>Logout</button>
        </div>
      )}
    </nav>
  )
}

export default Navbar
































// import React from 'react'
// import { Link, useNavigate } from 'react-router-dom'
// // import "../../index.css"

// function Navbar() {
//   const navigate = useNavigate()

//   function handle() {
//     localStorage.removeItem("userToken")
//     localStorage.removeItem("username")
//     navigate("/login")
//   }

//   const buttonClasses = "text-gray-600 hover:text-gray-700 px-4 py-1 rounded-full transition"

//   return (
//     <nav className="px-3 py-3">
//       <div className="flex items-center justify-between">
//         <Link to="/" className="text-3xl font-semibold font-[cursive]">Instagram</Link>

//         <div className="flex space-x-4 items-center">
//           <Link to="/" className={buttonClasses}>Home</Link>
//           <Link to="/Create" className={buttonClasses}>Create</Link>
//           <Link to="/profile" className={buttonClasses}>Profile</Link>
//           <button onClick={handle} className={buttonClasses}>Logout</button>
//         </div>
//       </div>
//     </nav>
//   )
// }

// export default Navbar


