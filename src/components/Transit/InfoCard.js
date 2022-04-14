import React from "react";
import { Link } from "react-router-dom";
import { Box, Button, Heading, Text } from "@chakra-ui/react";
import { dateTime } from "../../functions/generic.js";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'

const btnStyles = {
  width: 55,
  height: 55,
  fontSize: 27,
  bgColor: "surface.100",
  borderRadius: 10,
  mr: 18,
};

const boxStyles = {
  display: "flex",
  justifyContent: "space-between",
  ml: "5px",
  fontSize: "13px"
};

const InfoCard = (props) => {
  let start = props.data["start time"];
  let end = props.data["end time"];

  const transit_time = dateTime(start, end).time_span;
  const transit_date = dateTime(start).short_date;

  return (
    <Box className="card__body" pl={5}>
      <Heading pl="0" mt="10px" ml="5px" fontSize={22}>{props.data.Name}</Heading>
      <Box {...boxStyles} >
        <Box>
          <br />
          <Text color="secondary.400">{transit_date + "  " + transit_time + " UTC"}</Text><br />
          <Text color="secondary.400" mb="5px">
            {props.data["coords(J2000)"].split(" ")[0]}{" "}
            {props.data["coords(J2000)"].split(" ")[1]}
          </Text>
        </Box>

        <Box>
          <Link to={{
            pathname: '/transit/full/',
            state: {
              transit: props.data,
              ra: props.data["coords(J2000)"].split(" ")[0],
              dec: props.data["coords(J2000)"].split(" ")[1]
            }
          }}>
            <Button {...btnStyles} >
              <FontAwesomeIcon
                icon={faArrowRight}
              />
            </Button>
          </Link>
        </Box>
      </Box>
    </Box>
  )
}

export default InfoCard;