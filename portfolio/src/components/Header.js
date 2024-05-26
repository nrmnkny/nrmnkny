import React from 'react';
import profileImage from '../assets/DP.jpg';
import { FaMapMarkerAlt, FaEnvelope, FaPhoneAlt } from 'react-icons/fa';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBlog } from '@fortawesome/free-solid-svg-icons';
import { faXTwitter } from '@fortawesome/free-brands-svg-icons';

const Header = ({ name, title, location, email, phone, blogLink, twitterLink }) => {
  return (
    <header className="bg-black p-4 flex flex-col md:flex-row items-center justify-between">
      <div className="flex items-center">
        <img src={profileImage} alt={name} className="rounded-full w-16 h-16 border-4 border-yellow-500" />
        <div className="ml-4">
          <h1 className="text-xl font-bold text-white">{name}</h1>
          <p className="text-md text-yellow-500">{title}</p>
        </div>
      </div>
      <div className="text-white mt-4 md:mt-0 flex flex-col md:flex-row md:space-x-4 items-center">
        <p className="flex items-center">
          <FaMapMarkerAlt className="mr-2" /> {location}
        </p>
        <p className="flex items-center mt-2 md:mt-0">
          <FaEnvelope className="mr-2" /> {email}
        </p>
        <p className="flex items-center mt-2 md:mt-0">
          <FaPhoneAlt className="mr-2" /> {phone}
        </p>
        <div className="flex items-center justify-center mt-4 md:mt-0 md:ml-4 space-x-4">
          <a href={blogLink} target="_blank" rel="noopener noreferrer" className="text-yellow-500">
            <FontAwesomeIcon icon={faBlog} className="w-6 h-6" />
          </a>
          <a href={twitterLink} target="_blank" rel="noopener noreferrer" className="text-yellow-500">
            <FontAwesomeIcon icon={faXTwitter} className="w-6 h-6" />
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
