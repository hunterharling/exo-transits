import React from "react";
import SidePanel from './SidePanel.js';
import InfoCard from './InfoCard.js';
import Display from './Display.js';
import { Box } from "@chakra-ui/react";

const Transit = props => {
  return (
    <Box className="transit__card">
      <Display
        data={props.data} />
      <SidePanel
        auth={props.auth}
        data={props.data} />
      <InfoCard
        data={props.data} />
    </Box>
  );
}

export default Transit;