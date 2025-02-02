import React from "react";
import "./Footer.css";
import { FaFacebookF } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa6";
import { FaTwitter } from "react-icons/fa";

function Footer() {
  const links = [
    {
      title: "Home",
      link: "../pages/Home.jsx",
    },
    {
      title: "About Us",
      link: "../pages/AboutUs.jsx",
    },
    {
      title: "Contact Us",
      link: "../pages/ContactUs.jsx",
    },
    {
      title: "Orders",
      link: "../pages/Orders.jsx",
    },
    {
      title: "Help & Support",
      link: "../pages/Help.jsx",
    },
  ];
  return (
    <>
      <footer className="Container bg-gradient-to-r from-[#2460A7] via-[#85B3D1] to-[#B3C7D6] text-white">
        <div className="innerContainer">
          <div className="logo_icons">
            <div className="transform hover:scale-105 transition-transform duration-300 ml-4">
              <h1 className="text-3xl md:text-4xl font-bold font-mono tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-[#c7cace] to-[#85B3D1] drop-shadow-lg hover:drop-shadow-2xl transition-all duration-300">
                DarkArtX
              </h1>
            </div>
            <div className="icons">
              <div className="faceBook icon transform hover:scale-105 transition-transform duration-300">
                <a href=""><FaFacebookF /></a>
              </div>
              <div className="youTube icon transform hover:scale-105 transition-transform duration-300">
                <a href=""><FaYoutube /></a>
              </div>
              <div className="instagram icon transform hover:scale-105 transition-transform duration-300">
                <a href=""><FaInstagram /></a>
              </div>
              <div className="twitter icon transform hover:scale-105 transition-transform duration-300">
                <a href=""><FaTwitter /></a>
              </div>
            </div>
          </div>
          <div className="links">
            <h1 className="heading">MENU</h1>
            {links.map((item) => {
              return (
                <div className="link transform hover:scale-105 transition-transform duration-300">
                  <a href={item.link}>{item.title}</a>
                </div>
              );
            })}
          </div>
          <div className="contact">
            <h1 className="heading">CONTACT</h1>
            <ul className="contactList">
              <li>Email:DarkCart@gamil.com</li>
              <li>Phone : 044 832 452</li>
              <li>Mobile: +91 86497789067</li>
              <li>
                Location: <a href="#">Click here</a>
              </li>
            </ul>
          </div>
          <div className="get_in_touch">
            <h1 className="heading">Get In Touch</h1>
            <div className="getInTouchForm">
              <input
                type="text"
                className="email"
                placeholder="Your email address"
              />
              <button className="getInTouch">SUBMIT</button>
            </div>
          </div>
        </div>
        <div className="copyright">
            Copy right c 2025 .Darkcart Inc, The Madras institute of Technology
          </div>
      </footer>
    </>
  );
}

export default Footer;
