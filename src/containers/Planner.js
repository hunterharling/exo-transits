import React from 'react';
import {
  Heading,
  Box,
  Text
} from "@chakra-ui/react"
import { GET } from '../functions/post.js';
import Card from '../components/Planner/PlannerCard.js';
import { Spinner, H1 } from '../library/CustomUI.js';
import { UPCOMING_TRANSIT_API } from '../paths.js';
import { currentDate } from '../functions/generic.js';

const day = currentDate().day;
const month = currentDate().month;
const year = currentDate().year;
const full_date = currentDate().full_date;

// Planner component
class Planner extends React.Component {
  state = {
    user: this.props.user,
    transits: [],
    tonights_transits: [],
    remaining_transits: [],
    showTonights: true
  }

  componentDidMount() {
    this.ismounted = true;
    this.fetchTransits();
  }

  fetchTransits = () => {
    GET(
      UPCOMING_TRANSIT_API,
      localStorage.getItem('token__auth')).then(res => {
        // if (this.ismounted) {

          let transits = res.data;
          let t_array = []

          // push the json string into array
          transits.forEach(t => {
            t_array.push(JSON.parse(t.transit))
          })

          // set new array
          this.setState({
            transits: t_array
          }, () => this.filterToday());
        // }
      });
  }

  componentWillUnmount() {
    this.ismounted = false;
  }

  removeTranst = (id, array) => {
    if (array === "tonights_transits") {
      this.state.tonights_transits.splice(id, 1)
      this.setState({
        tonights_transits: this.state.tonights_transits
      });
    }
    else {
      this.state.remaining_transits.splice(id, 1)
      this.setState({
        remaining_transits: this.state.remaining_transits
      });
    }
  }

  // filterToday = () => {
  //   let tonights = [];
  //   let remaining = [];

  //   this.state.transits.forEach(t => {
  //     let isTonight = t["start time"].split(" ")[0] === full_date;
  //     let isInFuture = Date(
  //       t["start time"].split("-")[0],
  //       t["start time"].split("-")[1],
  //       t["start time"].split("-")[2]
  //     ) >= Date.now();

  //     if (isTonight) {
  //       tonights.push(t);
  //     }
  //     else if (isInFuture) {
  //       remaining.push(t);
  //       console.log((t["start time"].split("-")[0] > year),
  //         (t["start time"].split("-")[1] > month),
  //         (t["start time"].split("-")[2] > day))
  //     }
  //     else {
  //       console.log(year, month, day)
  //     }
  //   });

  //   this.setState({
  //     tonights_transits: tonights,
  //     remaining_transits: remaining
  //   });
  // }

  filterToday = () => {
    let tonights = [];
    let remaining = [];

    this.state.transits.forEach(t => {
      let isTonight = t["start time"].split(" ")[0] === full_date;
      const date2 = new Date(t["start time"].split("-")[0] + "-" +
        t["start time"].split("-")[1] + "-" +
        t["start time"].split("-")[2].split(" ")[0] + "T" +
        t["start time"].split(" ")[1] + ":00Z");
      let isInFuture =
        (date2 > new Date());
      if (isTonight) {
        tonights.push(t);
      }
      else if (isInFuture) {
        remaining.push(t);
      }
      else {
        console.log(date2)
        console.log(t)
      }
    });
    // TODO: SET CORRECT DATES
    this.setState({
      tonights_transits: remaining,
      remaining_transits: tonights,
      hasresults: true
    });
  }

  render() {
    let isMobile = this.props.width < 800;
    let isSmallMobile = this.props.width < 550;

    const boxAttrs = {
      borderRight: !isMobile ? "1px solid #222222" : "",
      mr: "30px",
      mt: "20px",
      className: "planner__data",
      width: 300,
      display: isMobile ? "flex" : "block",
      justifyContent: isMobile ? "center" : "",
      margin: isMobile ? "0 auto" : ""
    };
    
    // TODO: deal with upcoming vs past vs tonight
    return (
      <React.Fragment>
        {!isSmallMobile && <H1>Planner</H1>}
        {!this.ismounted ?
          <Spinner />

          :
  
          <Box className="planner" display={!isMobile ? "flex" : "block"}>
            <Box {...boxAttrs} >
              {!isMobile ?
                <>
                  <Heading onClick={() => this.setState({ showTonights: true })}
                    className="planner__selector"
                    mt={0}
                    minW="200px"
                    backgroundColor={!this.state.showTonights ? 'none' : 'surface.400'}
                    color={!this.state.showTonights ? "light.300" : "secondary.300"}>
                    Upcoming ({this.state.tonights_transits.length})
                  </Heading>

                  <Heading onClick={() => this.setState({ showTonights: false })}
                    className="planner__selector"
                    mt={isMobile ? "0" : 10}
                    minW="200px"
                    backgroundColor={this.state.showTonights ? 'none' : 'surface.400'}
                    color={this.state.showTonights ? "light.300" : "secondary.300"}>
                    Past ({this.state.remaining_transits.length})
                  </Heading>
                </>
                :
                <Box display="flex" w={this.props.width}>
                  <Heading onClick={() => this.setState({ showTonights: true })}
                    className="planner__selector"
                    mt={0}
                    borderRadius={0}
                    w={this.props.width / 2.3}
                    borderBottom="2px solid"
                    borderBottomColor={!this.state.showTonights ? "light.600" : "secondary.300"}
                    color={!this.state.showTonights ? "light.600" : "secondary.300"}>
                    Upcoming ({this.state.tonights_transits.length})
                  </Heading>

                  <Heading onClick={() => this.setState({ showTonights: false })}
                    className="planner__selector"
                    borderRadius={0}
                    w={this.props.width / 2.3}
                    borderBottom="2px solid"
                    borderBottomColor={this.state.showTonights ? "light.600" : "secondary.300"}
                    mt={isMobile ? "0" : 10}
                    mr={0}
                    color={this.state.showTonights ? "light.600" : "secondary.300"}>
                    Past ({this.state.remaining_transits.length})
                  </Heading>
                </Box>
              }
            </Box>


            {this.state.showTonights ?
              <Box className="tonights__transits" flex={2}>
                {this.state.tonights_transits.length > 0 ?
                  this.state.tonights_transits.slice().splice(0, 50).map((transit, index) =>
                    <Card removeSelf={() => this.removeTranst(index, "tonights_transits")} key={index} transit={transit} />
                  )

                  :

                  <Text textAlign="center" mt={55} color="light.400">Nothing tonight</Text>
                }
              </Box>

              :

              <Box className="remaining__transits" flex={2}>
                {this.state.remaining_transits.length > 0 ?
                  this.state.remaining_transits.slice().splice(0, 50).map((transit, index) =>
                    <Card removeSelf={() => this.removeTranst(index, "remaining_transits")} key={index} transit={transit} />
                  )

                  :

                  <Text textAlign="center" mt={55} color="light.400">No upcoming transits</Text>
                }
              </Box>
            }
          </Box>
        }

        <Box minH={100}></Box>
      </React.Fragment>
    );
  }
}

export default Planner;