import React, { useState } from "react";
import {
  Input as ChakraInput,
  Button as ChakraButton,
  Box,
  Text,
  Heading
} from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Loader from 'react-loader-spinner'
import { faChevronDown, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { Link as L } from "react-router-dom";

export const Link = ({ children, ...props }) => {
  return (
    <L {...props}>
      {children}
    </L>
  );
}

// Styled heading
export const H1 = ({ children, ...props }) => {
  return (
    <Heading {...props} mt={props.mt ? props.mt : 5} mb={props.mb ? props.mb : 5} className="screen__heading">
      {children}
    </Heading>
  );
}

// Embed icon in input
export const Input = ({ children, ...props }) => (
  <div 
    className="input__component">
    <FontAwesomeIcon icon={props.i} style={{zIndex: "2"}}></FontAwesomeIcon>

    <ChakraInput
      borderColor="#707070"
      pl={10}
      h="45px"
      color="light.300"
      focusBorderColor="primary.700"
      {...props} />
  </div>
)

// Styled button
export const Button = ({ children, ...props }) => {
  return (
    <ChakraButton
      {...props}
      type="button"
      bgColor={"primary.700"}
      color={"light.50"}
      width={150}
      height={45}>
      {children}
    </ChakraButton>
  );
}

export const Foot = ({ children, ...props }) => {
  const styles = {
    bottom: 0,
    height: "60px",
    borderTop: "1px solid #444",
    margin: "0 auto",
    position: "static",
    display: "flex",
    justifyContent: "space-between",
    padding: "0 5%",
    flexWrap: "wrap",
    width: props.isMobile ? "90%" : "65%",
  };

  return (
    <Box {...styles}>
      {children}
    </Box>
  );
}

// Custom loader
export const Spinner = (props) => {
  return(
    <Box
      display="flex"
      justifyContent="center"
      className="spinner"
      width="100%"
      alignItems="center"
      height="200px"
      mt={10}>
      <Box justifyContent="center" textAlign="center">
        <Loader type="TailSpin" margin="0 auto" color="#2a60bc" height={80} width={80} />
        <Text fontSize={20} mt={10}>{props.t}</Text>
      </Box>
    </Box>
  )
}

// Colored text with label
export const ColorBox = ({ identifier, text }) => {
  return (
    <Box
      display="flex"
      fontSize="15px"
      marginY={5}>
      <Text color="secondary.400" mr={3}>{identifier}</Text>
      <Text color="light.200">{text}</Text>
    </Box>
  );
}

// Open dropdown
export const Dropdown = (props) => {
  const [ open, setOpen ] = useState(props.open);

  return (
    <React.Fragment>
      <Text
        cursor="pointer"
        color={props.color ? props.color : "light.500"}
        fontSize={props.fontSize ? props.fontSize : 16}
        onClick={() => (open ? setOpen(false) : setOpen(true))}
        pt={5}
        mt={7}
        display="flex"
        alignItems="center"
      >
        <FontAwesomeIcon
          icon={open ? faChevronDown : faChevronRight}
          style={{ marginRight: "5px", fontSize: "22px", width: "15px", height: "15px" }}
        />
        {props.text}
      </Text>

      <Box pl={props.pl ? props.pl : 0}>
        {open ? props.children : null}
      </Box>
    </React.Fragment>
  );
}
