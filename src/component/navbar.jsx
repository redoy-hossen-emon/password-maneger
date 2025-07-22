import React from 'react'

const Navbar = () => {
  return (
    <>
      <nav className="px-30 bg-gray-800 p-4 flex justify-between items-center">
        <div className="logo text-3xl text-white">
          <span className="text-gray-500 font-bold text-4xl" >&lt;</span>
          PassOP
          <span className="text-gray-500 font-bold text-4xl">/&gt;</span>
        </div>
        <ul className=" flex justify-between items-center space-x-4">
          <li className="text-white"><a href='#'> Home </a></li>
          <li className="text-white"><a href='#'> About </a></li>
          <li className="text-white"><a href='#'> Contact </a></li>
          <li className="text-white"><a href='#'> Blog </a></li>
        </ul>
      </nav >
    </>
  )
}

export default Navbar