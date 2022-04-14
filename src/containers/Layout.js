import React from 'react';
import Banner from "../components/Layout/Banner.js";
import MobileHeader from "../components/Layout/MobileHeader.js";
import Footer from "../components/Layout/Footer.js";
import * as paths from "../paths.js";
import {
  useLocation
} from "react-router-dom";

const CustomLayout = (props) => {
  const loc = useLocation();
  let isMobile = props.width < 550;
  let isDetailView = loc.pathname === paths.TRANSIT_FULL;
  let isPlannerView = loc.pathname === paths.PLANNER;
  let isSettingsView = loc.pathname === paths.SETTINGS;

  let headerTitle = "";
  if (isDetailView)
    headerTitle = props.header_title;
  if (isSettingsView)
    headerTitle = "Settings";
  if (isPlannerView)
    headerTitle = "Planner";

  return (
    <React.Fragment>
      {(!headerTitle || !isMobile) ?
        <Banner
          width={props.width}
          height={props.height}
          auth={props.auth}
          logout={props.logout}
          logint={props.login} />
        :
        <MobileHeader
          back={"/transits"}
          header_title={headerTitle} />
      }

      {props.children}

      <Footer auth={props.auth} width={props.width} />
    </React.Fragment>
  );
}

export default CustomLayout;