import React from "react";

const Footer = () => (
  <footer className="bg-gray-800 text-gray-200 py-6">
    <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
      <span className="text-sm">&copy; {new Date().getFullYear()} Password Manager. All rights reserved.</span>
      <div className="flex space-x-4 mt-2 md:mt-0">
        <a href="#" className="hover:text-white transition">Privacy Policy</a>
        <a href="#" className="hover:text-white transition">Terms of Service</a>
        <a href="#" className="hover:text-white transition">Contact</a>
      </div>
    </div>
  </footer>
);

export default Footer;