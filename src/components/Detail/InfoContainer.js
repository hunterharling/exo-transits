import React from 'react';
import {
  Box
} from "@chakra-ui/react";
import { ColorBox } from "../../library/CustomUI.js";

const boxStyles = {
  padding: "10px 25px",
  marginY: "10px",
  borderRadius: "5px",
  backgroundColor: "surface.500",
};

const InfoContainer = ({ transit, ra, dec }) => {
  console.log(transit)
  return (
    <Box {...boxStyles} >
      <ColorBox identifier="MAG" text={transit.V + " V"} />
      <ColorBox identifier="RA" text={ra} />
      <ColorBox identifier="DEC" text={dec} />
      <ColorBox identifier="PERCENT BASELINE OBSERVABLE" text={transit.percent_baseline_observable + "%"} />
      <ColorBox identifier="PERCENT TRANSIT OBSERVABLE" text={transit.percent_transit_observable + "%"} />
      <ColorBox identifier="DEPTH" text={transit["depth(ppt)"] + " ppt"} />
      <ColorBox identifier="TRANSIT START" text={transit["start time"] + " UTC"} />
      <ColorBox identifier="TRANSIT END" text={transit["end time"] + " UTC"} />
      <ColorBox identifier="DURATION" text={transit["duration(hours)"] + " Hr"} />
      <ColorBox identifier="ELEVATION START, MID, END"
        text={transit.el_start + "°, " +
          (transit.el_mid + "°, ") +
          transit.el_end + "°"} />
    
      <ColorBox identifier="MOON DISTANCE" text={transit.moon_dist_deg + "°"} />
      <ColorBox identifier="MOON PERCENT" text={transit.moon_percent + "%"} />
      
      <ColorBox identifier="T_0(BJD_TDB)" text={transit["T_0(BJD_TDB)"] + " ± " + transit.T_0_unc} />
      
      <ColorBox identifier="PERIOD"
        text={transit["period(days)"] + " ± " +
          transit["period_unc(days)"] + " days"} />
      
      <ColorBox identifier="HA START,MID, END" text={transit.ha_start + ", " +
          (transit.ha_mid + ", ") +
          transit.ha_end + ""} />
     
      <ColorBox identifier="AZ START, MID, END"
        text={transit.az_start + "°, " +
        (transit.az_mid + "°, ") +
        transit.az_end + "°"} />

    </Box>
  );
}

export default InfoContainer;