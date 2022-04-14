import React from "react";
import { Box } from "@chakra-ui/react";

const Display = (props) => {
  // Conditional coloring for magnitude
  let isLowMagnitude = parseInt(props.data["V"], 10) > 14;
  let isHighMagnitude = 11 > parseInt(props.data["V"], 10);

  let mag_style =
    isLowMagnitude ? 'surface.200' :
      (
        isHighMagnitude
          ? 'primary.400'
          : 'primary.700'
      )
  
  // Conditional coloring for visiblity
  let isLowVisibility = parseInt(props.data["percent_transit_observable"], 10) < 33;
  let isHighVisibility = 66 < parseInt(props.data["percent_transit_observable"], 10);

  let vis_style =
    isLowVisibility ? 'surface.200' :
      (
        isHighVisibility
          ? 'primary.400'
          : 'primary.700'
      )
  
  // Conditional coloring for depth
  let isLowDepth = parseInt(props.data["depth(ppt)"], 10) < 2;
  let isHighDepth = parseInt(props.data["depth(ppt)"], 10) > 9;

  let depth_style =
    isLowDepth ? 'surface.200' :
      (
        isHighDepth
          ? 'primary.400'
          : 'primary.700'
      )

  return (
    <Box className="depth__display">
      <Box className="circle ppt" bgColor={depth_style} fontSize={20}>
        {props.data["depth(ppt)"]} <br />ppt
      </Box>

      <Box className="circle mag" bgColor={mag_style} fontSize={20}>
        {props.data.V} <br />m
      </Box>

      <Box className="circle vis" bgColor={vis_style} fontSize={20}>
        {props.data.percent_transit_observable}% <br />visible
      </Box>
    </Box>
  )
}

export default Display;