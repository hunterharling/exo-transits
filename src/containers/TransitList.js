import React from "react";
import ReactGA from 'react-ga';
import Search from "../components/Search/Search.js";
import {
  Box
} from "@chakra-ui/react";
import Transit from "../components/Transit/Transit";
import { parse, POST, GET } from '../functions/post.js';
import { Spinner, H1 } from '../library/CustomUI.js';
import { TRANSITS_API } from '../paths.js';
import { currentDate } from '../functions/generic.js';
import { OnlineStatusWrapper } from '../useOnlineStatus';
const full_date = currentDate().full_date;

const boxAttrs = {
  className: "transits",
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "space-between",
  maxWidth: "800px",
  margin: "0 auto",
  hasresults: false
};

class TransitList extends React.Component {
  ismounted = false;

  state = {
    transits: [],
    search_results: []
  };

  fetchTransits = () => {
    let data = {};
    let user = JSON.parse(localStorage.getItem("user"));

    if (user)
      data = { lat: user.lat, lng: user.lng };

    POST(TRANSITS_API, data).then(r => {
      if (this.ismounted) {
        // Filter for upcoming transits only
        this.filterToday(parse(r.data.Transits));
      }
    });
  }

  setTransits = (transits) => {
    this.setState({
      search_results: transits
    }, () => console.log("NEW LIST: " + this.state.search_results));
  }

  componentDidMount() {
    ReactGA.initialize(this.props.ga);
    ReactGA.set({ page: window.location.pathname });
    ReactGA.pageview(window.location.pathname + window.location.search);

    this.ismounted = true;
    this.fetchTransits();
  }

  componentWillUnmount() {
    this.ismounted = false;
  }

  filterToday = (transits) => {
    let tonights = [];
    let remaining = [];

    transits.forEach(t => {
      let isTonight = t["start time"].split(" ")[0] === full_date;
      const date2 = new Date(t["start time"].split("-")[0] + "-" +
        t["start time"].split("-")[1] + "-" +
        t["start time"].split("-")[2].split(" ")[0] + "T" +
        t["start time"].split(" ")[1] + ":00Z");
      let isInFuture =
        (
          date2 > new Date());
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

    this.setState({
      transits: remaining,
      search_results: remaining,
      hasresults: true
    });
  }

  render() {
    return (
      <React.Fragment>
        <H1>Transits</H1>

        <OnlineStatusWrapper>
          {this.state.transits ? <Search returnTransits={this.setTransits} search_results={this.state.search_results} transits={this.state.transits.slice()} /> : null}

          {!this.state.hasresults ?

            <Spinner t="Transits take several seconds to load..." />

            :

            <Box {...boxAttrs} >
              {this.state.search_results.slice().splice(0, 55).map((transit, index) =>
                <Transit key={index} data={transit} auth={this.props.auth} />)}
            </Box>
          }
        </OnlineStatusWrapper>
      </React.Fragment>
    );
  }
}

export default TransitList;