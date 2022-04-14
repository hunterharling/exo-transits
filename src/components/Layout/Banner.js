import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCog } from '@fortawesome/free-solid-svg-icons'
import * as paths from '../../paths.js';
import { Link } from "react-router-dom";
import Menu from "./Menu.js";
import Navbar from "./Navbar.js";
import { Box } from "@chakra-ui/react";
import { LOGO } from "./logo.js";

const Grid = (props) => {
  return (
    <div {...props}
      className="menu__grid__container material__btn">

      <div className="menu__grid">
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  )
}

class Banner extends React.Component {
  state = {
    clickcounter: 0,
    width: this.props.width,
    height: this.props.height
  };

  closeMenu = () => {
    this.setState({
      clickcounter: this.state.clickcounter + 1
    });
  }

  render() {
    let isMobile = this.props.width < 800;
    let navIsVisible = this.state.clickcounter % 2 !== 0;

    return (
      <React.Fragment>
        <Box className="backdrop" onClick={this.closeMenu} display={navIsVisible ? "block" : "none"}></Box>

        <Box className="banner">

          {isMobile &&
            <Grid onClick={this.closeMenu} />
          }

          {(navIsVisible && isMobile) &&
            <Menu right={false} auth={this.props.auth} logout={this.props.logout} hide={this.closeMenu} /> }

          <Link to="/">
            <h1 className="h2__header" style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}>
              {LOGO}
              <span id="logo__text">EXO TRANSITS</span>
            </h1>
          </Link>

          {!isMobile ?
            <Navbar width={this.props.width} auth={this.props.auth}>
              {(navIsVisible) &&
                <Menu right={true} auth={this.props.auth} logout={this.props.logout} hide={this.closeMenu} /> }
              <Grid onClick={this.closeMenu} />
            </Navbar>

            : this.props.auth ?
              <Link to={paths.SETTINGS}
                className="material__btn"
                style={{ fontSize: '20px' }}>
                <FontAwesomeIcon icon={faUserCog}></FontAwesomeIcon>
              </Link>

              :

              <Link to={paths.LOGIN} className="material__btn">
                <Box className="material__btn">Login</Box>
              </Link>
          }

        </Box>
      </React.Fragment>
    );
  }
}

export default Banner;