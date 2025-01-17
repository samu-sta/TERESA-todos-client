import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './styles/Navbar.css';
import { GrTask } from "react-icons/gr";
import { FaCalendarDays } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";

function Navbar({setActive, active}) {

  return (
    <nav className="navbar">
      <ul className="navbar-list">
        <li
          className={`navbar-item ${active === 'Diarias' ? 'navbar-item-active' : ''}`}
          onClick={() => setActive('Diarias')}>
          <GrTask className='navbar-icon' />
          <p>Diarias</p>
        </li>
        <li
          className={`navbar-item ${active === 'Calendario' ? 'navbar-item-active' : ''}`}
          onClick={() => setActive('Calendario')}>
          <FaCalendarDays className='navbar-icon' />
          <p to="/about">Calendario</p>
        </li>
        <li
          className={`navbar-item ${active === 'Buscar' ? 'navbar-item-active' : ''}`}
          onClick={() => setActive('Buscar')}>
          <FaSearch className='navbar-icon' />
          <p to="/about">Buscar</p>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;