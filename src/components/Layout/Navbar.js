import React from "react";
import * as paths from '../../paths.js';
import { Link } from "react-router-dom";
import { Box } from '@chakra-ui/react';

const Navbar = (props) => {
  return (
    <Box
      className="navbar"
      display="flex"
      alignItems="center"
      justifyContent="space-between">
      
    {props.auth ?
      <React.Fragment>

        <Link to={paths.TRANSITS}>
          <p>
            Transits
          </p>
        </Link>

        <Link to={paths.PLANNER}>
          <p>
            Planner
          </p>
        </Link>
          
        <Link to={paths.SETTINGS}>
          <p>
            Settings
          </p>
        </Link>
        
        <Link to={paths.ABOUT}>
          <p>
            About
          </p>
        </Link>

        {props.children}
      </React.Fragment>

      :

      <React.Fragment>

        <Link to={paths.TRANSITS}>
          <p>
            Transits
          </p>
        </Link>

        <Link to={paths.ABOUT}>
          <p>
            About
          </p>
        </Link>
          
        <Link to={paths.SIGNUP}>
          <p>
            Signup
          </p>
        </Link>
          
        <Link to={paths.LOGIN}>
          <p>
            Login
          </p>
        </Link>

      </React.Fragment>
    }
      
    </Box>
  );
}

export default Navbar;