import React, { useState } from 'react';
import { FaBars } from 'react-icons/fa';

const Sidebar = ({ setContent }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex">
      <div className={`bg-black text-white w-full md:w-64 p-4 absolute inset-y-0 left-0 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0 transition-transform duration-200 ease-in-out z-10`}>
        <nav className="flex flex-col space-y-4">
          {['Education', 'Work Experience', 'Skills', 'Projects', 'Research Interests'].map((item) => (
            <button
              key={item}
              onClick={() => {
                setContent(item.toLowerCase().replace(' ', ''));
                setIsOpen(false); // Close the sidebar on mobile after selecting an item
              }}
              className="relative p-2 text-left rounded group focus:outline-none"
            >
              {item}
              <span className="absolute left-0 bottom-0 w-full h-0.5 bg-yellow-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out"></span>
            </button>
          ))}
        </nav>
      </div>
      <div className="md:hidden flex-1">
        <button onClick={toggleSidebar} className="p-4 focus:outline-none">
          <FaBars className="text-black" />
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
