import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCalendarPlus,
  faCheck
} from '@fortawesome/free-solid-svg-icons'
import { POST } from "../../functions/post.js";
import { CREATE_UPCOMING_API } from '../../paths.js';
import { Box, Button } from "@chakra-ui/react";
import { currentDate } from "../../functions/generic.js";

const btnAttrs = {
  type: "button",
  className: "full",
  backgroundColor: "surface.100"
};

const SidePanel = (props) => {
  // Tracks whether it has been added to planner
  const [clicked, setClicked] = useState(false);

  // Post request to planner obj creation
  const AddToPlanner = () => {
    let start = props.data["start time"];
    let year = start.split(" ")[0].split("-")[0];
    let day = start.split(" ")[0].split("-")[2];
    let month = start.split(" ")[0].split("-")[1];
    let hours = start.split(" ")[1].split(":")[0];

    if (!clicked && props.auth) POST(
      CREATE_UPCOMING_API,
      {
        user: localStorage.getItem('user').username,
        transit: JSON.stringify(props.data),
        name: props.data.Name,
        date: {
          year: year,
          day: day,
          month: month,
          hours: hours,
          now: currentDate().today.toUTCString(),
          tz: Intl.DateTimeFormat().resolvedOptions().timeZone
        },
        // used to determine if they are unique
        identifier: (props.data.Name + props.data["start time"])
      }
    ).then(res => {
      setClicked(true);
    });
  }

  return (
    <Box className="toggle">
      {props.auth &&
        <Button _hover={{background: "#33363e"}} onClick={AddToPlanner} {...btnAttrs} >
          <FontAwesomeIcon icon={clicked ? faCheck : faCalendarPlus}></FontAwesomeIcon>
        </Button>
      }
    </Box>
  )
}

export default SidePanel;