







import React, { useState } from "react";
import { FiShoppingCart, FiMenu, FiX, FiUser } from "react-icons/fi";
import { FaHome, FaStore, FaInfoCircle, FaPhone } from "react-icons/fa";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartItems] = useState(3);

return (
    <header className="bg-gradient-to-r from-[#2460A7] via-[#85B3D1] to-[#B3C7D6] text-white h-20 px-4 flex justify-between items-center shadow-lg w-full fixed top-0 z-50">
  
      <div className="flex items-center gap-x-4">
        <a
          href="/profile"
          className="relative p-3 rounded-full bg-white/90 hover:bg-[#D9B48F] transition-all duration-300 shadow hover:shadow-md"
        >
          <FiUser className="w-6 h-6 text-[#2460A7]" />
        </a>
      </div>

  
      <div className="transform hover:scale-105 transition-transform duration-300 ml-4">
        <h1 className="text-3xl md:text-4xl font-bold font-mono tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-[#c7cace] to-[#85B3D1] drop-shadow-lg hover:drop-shadow-2xl transition-all duration-300">
          DarkArtX
        </h1>
      </div>

      <div className="flex items-center gap-x-8 flex-1 justify-center relative">
            <div className="">
        <a
  href="/cart"
  className="absolute top-1/2 right-4 transform -translate-y-1/2 p-3 rounded-full bg-red-300 hover:bg-red-200 transition-all duration-300 shadow-md hover:shadow-lg"
>
  <FiShoppingCart className="w-7 h-7 text-[#cd0afe]" />
</a>

        </div>

       
        <nav className="hidden md:flex gap-x-6 lg:gap-x-8">
          {[
            { name: "Home", icon: <FaHome /> },
            { name: "Shop", icon: <FaStore /> },
            { name: "About", icon: <FaInfoCircle /> },
            { name: "Contact", icon: <FaPhone /> },
          ].map(({ name, icon }) => (
            <a
              key={name}
              href={`/${name.toLowerCase()}`}
              className="relative group px-3 py-2 transition-all duration-300 flex items-center gap-x-2"
            >
              <span className="text-white group-hover:text-[#D9B48F] transition-colors">
                {icon}
              </span>
              <span className="text-lg font-medium tracking-wide text-white group-hover:text-[#D9B48F] transition-colors">
                {name}
              </span>
              <span className="absolute bottom-0 left-0 h-0.5 bg-[#D9B48F] w-0 group-hover:w-full transition-all duration-300 origin-left rounded-full" />
            </a>
          ))}
        </nav>
      </div>

      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="md:hidden ml-4 p-3 rounded-full bg-white/90 hover:bg-[#D9B48F] transition-all duration-300 shadow hover:shadow-md"
      >
        {menuOpen ? (
          <FiX className="w-6 h-6 text-[#2460A7] transition-transform duration-300 rotate-180" />
        ) : (
          <FiMenu className="w-6 h-6 text-[#2460A7] transition-transform duration-300" />
        )}
      </button>

      <div className={`fixed inset-0 z-50 ${menuOpen ? "block" : "hidden"}`}>
        <div
          className={`fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${
            menuOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setMenuOpen(false)}
        />
        <div
          className={`fixed top-0 right-0 w-64 h-full bg-gradient-to-b from-[#85B3D1] to-[#2460A7] shadow-2xl transition-transform duration-500 ease-out-expo ${
            menuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="p-6 flex flex-col h-full">
            <button
              onClick={() => setMenuOpen(false)}
              className="self-end p-2 rounded-full hover:bg-white/10 transition-colors duration-300 mb-8"
            >
              <FiX className="w-8 h-8 text-white" />
            </button>
            <nav className="space-y-6 flex-1">
              {[
                { name: "Home", icon: <FaHome /> },
                { name: "Shop", icon: <FaStore /> },
                { name: "About", icon: <FaInfoCircle /> },
                { name: "Contact", icon: <FaPhone /> },
              ].map(({ name, icon }, index) => (
                <a
                  key={name}
                  href={`/${name.toLowerCase()}`}
                  className="block pl-6 py-3 text-xl text-white hover:text-[#D9B48F] transition-colors duration-300 transform hover:translate-x-2 rounded-lg hover:bg-white/10"
                  style={{ transitionDelay: `${index * 50}ms` }}
                >
                  {icon}
                  <span className="ml-2">{name}</span>
                </a>
              ))}
            </nav>
            <div className="pt-8 border-t border-white/20">
              <div className="flex space-x-4 justify-center">
                <FiUser className="w-6 h-6 text-white hover:text-[#D9B48F] cursor-pointer transition-colors duration-300" />
                <FiShoppingCart className="w-6 h-6 text-white hover:text-[#D9B48F] cursor-pointer transition-colors duration-300" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}