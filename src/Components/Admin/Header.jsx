// Header.jsx

import React from 'react';
import { BsFillBellFill, BsFillEnvelopeFill, BsPersonCircle, BsSearch, BsJustify } from 'react-icons/bs';
import { Link } from 'react-router-dom'; // Make sure to import Link from 'react-router-dom'

function Header({ OpenSidebar }) {
  return (
    <header className='header'>
      <div className='header-left'>
        <BsSearch className='icon' />
      </div>
      <div className='header-right'>
        <Link to="/">
          <button className="bg-green-500 hover:bg-green-900 text-white font-bold py-2 px-4 mb-2 rounded-full">
            Log out 
          </button>
        </Link>
       
      </div>
    </header>
  );
}

export default Header;
