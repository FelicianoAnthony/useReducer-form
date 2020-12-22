import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';

import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import { IconContext } from 'react-icons';

import { AuthContext } from '../../contexts/AuthContext';
import { SidebarContext } from '../../contexts/SidebarContext';
import { SidebarData } from '../Routes/SidebarData';
import * as authReducerConstants from '../../constants';

import './Navbar.css';


const Navbar = (props) =>  {

  const { dispatch } = useContext(AuthContext)
  const user = Cookies.get('user')
  const {showSidebar, sidebar} = useContext(SidebarContext)
  console.log(`navbar.js - AuthContext=${user} SidebarContext=${sidebar}`)

  const handleLogout = () => {
    Cookies.remove('user')
    dispatch({type: authReducerConstants.LOGOUT, loggedIn: false})
  }


  return (
    <>
      <IconContext.Provider value={{ color: '#fff' }}>
        {/* <div className='navbar'>
          <Link to='#' className='menu-bars'>
            <FaIcons.FaBars onClick={showSidebar} />
          </Link>
        </div> */}

        <div className='navbar-row'>
          <div className='navbar-row-left'> 
            <Link to='#' className='menu-bars'>
              <FaIcons.FaBars onClick={showSidebar} />
            </Link>
          </div>

          <div className="navbar-row-right">
            <ul> Logged In User={user} </ul>
            <IoIcons.IoIosHelpCircleOutline />
            <ul> Help </ul>
            <IoIcons.IoMdLogOut/>
            <button onClick={handleLogout}> Log Out </button>
            
          </div>

        </div>

        <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
          <ul className='nav-menu-items' onClick={showSidebar}>
            <li className='navbar-toggle'>
              <Link to='#' className='menu-bars'>
                <AiIcons.AiOutlineClose />
              </Link>
            </li>
            {SidebarData.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <Link to={item.path}>
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </IconContext.Provider>
    </>
  );
}

export default Navbar