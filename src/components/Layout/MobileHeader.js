import React from 'react';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { Box } from '@chakra-ui/react';

const headerStyles = {
  cursor: "pointer",
  pl: 10,
  mb: 5,
  height: "60px",
  display: "flex",
  alignItems: "center",
  fontSize: 25,
  background: "surface.500",
  fontWeight: 600,
}

const MobileHeader = (props) => {
  return (
    <Link to={props.back}>
      <Box {...headerStyles} >
        <FontAwesomeIcon icon={faArrowLeft}
          style={{ marginRight: "35px" }} />
          {props.header_title}
      </Box>
    </Link>
  );
}

export default MobileHeader;