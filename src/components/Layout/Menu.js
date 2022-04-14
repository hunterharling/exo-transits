import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faChartLine,
  faUser,
  faLock,
  faCog,
  faUserPlus,
  faNewspaper,
  faSearch,
  faTimes,
  faCalendarCheck
} from '@fortawesome/free-solid-svg-icons'
import * as paths from '../../paths.js';
import { Link } from "react-router-dom";
import { Heading, Box } from '@chakra-ui/react';

const Menu = (props) => {
  const logout = () => {
    props.logout();
    props.hide();
  }

  return (
    <Box
      right={props.right ? 0 : 'inherit'}
      left={props.right ? 'inherit' : 0}
      className="menu">
        
      {!props.right ?
        <Box textAlign="right" onClick={props.hide} className="close">
          <FontAwesomeIcon icon={faTimes}></FontAwesomeIcon>
        </Box>
        :
        <Box className="close" cursor="default"></Box>
      }

      <Heading fontSize="28px" textAlign="center" mb={5}>Exo Transits</Heading>

      { props.auth ?
      <React.Fragment>

        <Link onClick={props.hide} to={paths.TRANSITS}>
          <p>
            <FontAwesomeIcon icon={faSearch}></FontAwesomeIcon>
            Transits
          </p>
        </Link>

        <Link onClick={props.hide} to={paths.PLANNER}>
          <p>
            <FontAwesomeIcon icon={faCalendarCheck}></FontAwesomeIcon>
            Planner
          </p>
        </Link>

        <Link onClick={props.hide} to={paths.SETTINGS}>
          <p>
            <FontAwesomeIcon icon={faCog}></FontAwesomeIcon>
            Settings
          </p>
        </Link>
          
        <Link onClick={props.hide} to={paths.ABOUT}>
          <p>
            <FontAwesomeIcon icon={faNewspaper}></FontAwesomeIcon>
            About
          </p>
        </Link>

        <p onClick={logout}>
          <FontAwesomeIcon icon={faLock}></FontAwesomeIcon>
          Logout
        </p>

      </React.Fragment> 
      
      :

      <React.Fragment>

        <Link onClick={props.hide} to={paths.TRANSITS}>
          <p>
            <FontAwesomeIcon icon={faChartLine}></FontAwesomeIcon>
            Transits
          </p>
        </Link>
        
        <Link onClick={props.hide} to={paths.LOGIN}>
          <p>
            <FontAwesomeIcon icon={faUser}></FontAwesomeIcon>
            Login
          </p>
        </Link>

        <Link onClick={props.hide} to={paths.SIGNUP}>
          <p>
            <FontAwesomeIcon icon={faUserPlus}></FontAwesomeIcon>
            Signup
          </p>
        </Link>
        
        <Link onClick={props.hide} to={paths.ABOUT}>
          <p>
            <FontAwesomeIcon icon={faNewspaper}></FontAwesomeIcon>
            About
          </p>
        </Link>

      </React.Fragment>
      }
    </Box>
  );
}

export default Menu;