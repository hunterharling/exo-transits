import React from "react";
import {
  faChevronRight,
  faTimes
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as paths from "../../paths.js";
import { Link } from "react-router-dom";
import {
  Heading,
  Box,
  Text,
  Button
} from "@chakra-ui/react"
import { POST } from '../../functions/post.js';

const cardStyles = {
  pl: 6,
  backgroundColor: "surface.500",
  mt: 5,
  minH: 85,
  marginX: "auto",
  display: "flex",
  alignItems: "center",
  borderRadius: "10px",
  justifyContent: "space-between",
};

const headingStyles = {
  fontSize: "17px",
  fontWeight: "400",
  pl: "0",
  color: "secondary.300"
};

const btnStyles = {
  fontSize: "28px",
  color: "light.200",
  w: 50,
  h: 50,
  borderRadius: "10px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  mr: 15,
  bgColor: "surface.100",
}

const Card = (props) => {
  let transit = props.transit;

  const removeTransit = (t) => {
    POST(
      paths.DELETE_UPCOMING,
      { identifier: t }).then(res => {
        if (res.data.message === "success")
          props.removeSelf();
      });
  }

  return (
    <Box className="planner__card" {...cardStyles} >
      <Box>
        <Text color="light.300" fontSize="11px">{transit["start time"]}</Text>
        <Heading {...headingStyles} >{transit.Name}</Heading>
      </Box>

      <Box display="flex">
        <Button className="rounded__btn" {...btnStyles}
          onClick={() => removeTransit(transit.Name + transit["start time"])}
          >
          <FontAwesomeIcon icon={faTimes}></FontAwesomeIcon>
        </Button>

        <Link to={{ pathname: '/transit/full/',
          state: { transit: transit }
        }}>
          <Button className="rounded__btn" {...btnStyles}>
            <FontAwesomeIcon icon={faChevronRight}></FontAwesomeIcon>
          </Button>
        </Link>
      </Box>
    </Box>
  )
}

export default Card;