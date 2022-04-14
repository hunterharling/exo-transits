import React from 'react';
import {
  Box
} from "@chakra-ui/react"
import { ColorBox } from "../../library/CustomUI.js";

const boxStyles = {
  padding: "10px 25px",
  marginY: "10px",
  borderRadius: "5px",
  backgroundColor: "surface.500",
};

class StarInfo extends React.Component {
  parsec_distance = parseFloat(this.props.info.distance, 10);
  dis = String((this.parsec_distance * 3.26156).toFixed(3));

  render() {
    return (
      <Box {...boxStyles}>
        <ColorBox identifier="DISTANCE" text={this.dis !== "NaN" ? this.dis + " ly" : "N/A"} />
        <ColorBox identifier="RADIAL VELOCITY" text={this.props.info.r_vel !== "N/A" ?
          this.props.info.r_vel + " km/s" : "N/A"} />
        <ColorBox identifier="SPECTRAL TYPE" text={this.props.info.spec} />
        <ColorBox identifier="PLANETS / CHILDREN" text={this.props.info.children} />
      </Box>
    );
  }
}

export default StarInfo;