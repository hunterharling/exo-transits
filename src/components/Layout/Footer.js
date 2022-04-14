import { Box, Heading } from '@chakra-ui/react';
import React from 'react';
import { Link } from 'react-router-dom';
import * as paths from '../../paths.js';
import { Foot } from '../../library/CustomUI.js';

const Footer = (props) => {
  let isMobile = props.width < 900;

  const boxStyles = {
    color: "light.500",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "space-between",
    fontSize: 13,
    height: isMobile ? "45px" : "auto",
    width: isMobile ? "100%" : "350px",
    display: "flex",
    padding: "0 10px"
  }

  const headingStyles = {
    as: "h3",
    paddingBottom: isMobile ? "15px" : "0",
    width: isMobile ? "100%" : "auto",
    textAlign: "center",
    color: "light.300",
    fontSize: 16,
    display: "fles",
    alignItems: "center",
    justifyContent: "center"
  }

  return (
    <Foot className="footer" isMobile={isMobile} >
      {!isMobile &&
        <Heading className="footer__copyright" {...headingStyles}>
          &copy; Hunter Harling, Exotransits.com
        </Heading>
      }
      <Box {...boxStyles}>
        <Link to={paths.TRANSITS}>TRANSITS</Link>
        <Link to={paths.ABOUT}>ABOUT</Link>
        {props.auth
          ?
          <Link to={paths.PLANNER}>PLANNER</Link>
          :
          <Link to={paths.LOGIN}>LOGIN</Link>
        }

      </Box>
      {/* add copyright */}
      {isMobile &&
        <Heading className="footer__copyright" {...headingStyles}>
          &copy; Hunter Harling, Exotransits.com
        </Heading>
      }
    </Foot>
  );
}

export default Footer;