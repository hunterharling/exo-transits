import React from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import { Box } from "@chakra-ui/react"
import { Dropdown, H1 } from "../library/CustomUI.js";
import InfoContainer from "../components/Detail/InfoContainer.js";
import StarData from "../components/Detail/StarData.js";
import { POST } from "../functions/post.js";
import * as paths from "../paths.js";

class FullTransit extends React.Component {
  constructor(props) {
    super(props);

    if (this.props.location.state) {
      this.state = {
        transit: this.props.location.state.transit,
        ra: this.props.location.state.ra,
        dec: this.props.location.state.dec,
        starData: {}
      }
    }
    else {
      this.state = {
        transit: {},
        ra: "",
        dec: "",
        starData: {}
      }
    }
  }

  componentDidMount() {
    // set header
    this.props.setHeader(this.state.transit.Name);

    // fetch star info from api
    this.fetchInfo();

    // eslint-disable-next-line
    eval(
      `var aladin = 
      A.aladin(
        '#aladin__container',
        {
          reticleColor: 'rgb(58 101 189)',
          showFrame: false,
          survey: "P/DSS2/color",
          fov:.12,
          showZoomControl: false,
          showLayersControl: false,
          showGotoControl: false,
          target: "${this.state.transit.Name}"
        }
      );
    `);
  }

  fetchInfo() {
    POST(paths.STAR_API, { name: (this.state.transit.Name).split(" ")[0] }).then(res => {
      this.setState({
        starData: {
          children: res.data.star.children,
          distance: res.data.star.distance,
          r_vel: res.data.star.r_vel,
          spec: res.data.star.spec
        },
      });
    });
  }

  render() {
    if (this.props.location.state)
      return (
        <section className="transit__detail">
          <Box pb={100}>
            {this.props.width > 550 &&
              <H1>{this.state.transit.Name}</H1>}
            
            {/* Sky map */}
            <Box
              mt={5}
              width={"100%"}
              height="300px"
              margin="0 auto"
              id="aladin__container">
            </Box>

            <Dropdown
              text={this.state.transit.Name+ " Transit Information"}
              open={true}>
              <InfoContainer
                transit={this.state.transit}
                ra={this.state.ra}
                dec={this.state.dec} />
            </Dropdown>

            <Dropdown
              text={"About " + this.state.transit.Name + " Host Star"}
              open={false}>
              {this.state.starData &&
                <StarData info={this.state.starData} />}
            </Dropdown>

          </Box>
        </section>
      );
    return (
      <Redirect to="/transits/" />
    );
  }
}

export default withRouter(FullTransit);