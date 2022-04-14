import React from "react";
import {
  faSearch,
  faStar,
  faPercentage,
  faRulerVertical,
} from "@fortawesome/free-solid-svg-icons";
import { Box, Heading } from "@chakra-ui/react";
import { Input } from "../../library/CustomUI.js";
import { Dropdown } from "../../library/CustomUI.js";

const headingStyles = {
  fontSize: 25,
  mt: 15,
  color: "secondary.300",
  textAlign: "center",
  fontWeight: "300",
  mb: "0"
};

const inputAttrs = {
  className: "transit__search",
  type: "text",
  backgroundColor: "main.100",
  borderColor: "#515151"
};

class Search extends React.Component {
  // Display result info
  state = {
    searchResults: {},
    name: '',
    depth: '',
    mag: '',
    vis: ''
  }

  searchTransits = (data) => {
    let NEW_STATE = {};

    /** check if state needs to be set,
    * if value is empty then set it to all as needed
    */
    if (data.name === "empty") {
      NEW_STATE["name"] = ""
    }
    else {
      if (data.name) NEW_STATE["name"] = data.name;
    }

    if (data.mag === "empty") {
      NEW_STATE["mag"] = "20"
    }
    else {
      if (data.mag) NEW_STATE["mag"] = data.mag;
    }

    if (data.vis === "empty") {
      NEW_STATE["vis"] = "0"
    }
    else {
      if (data.vis) NEW_STATE["vis"] = data.vis;
    }

    if (data.depth === "empty") {
      NEW_STATE["depth"] = "0"
    }
    else {
      if (data.depth) NEW_STATE["depth"] = data.depth;
    }

    // set state then run filters 
    this.setState(NEW_STATE, () => {
      console.log(this.state)
      let new_list = [];

      this.props.transits.forEach(t => {
        // if there are values in filters, filter, otherwise pass all 
        let mag_pass = (this.state.mag ?
          (parseFloat(t.V) <= parseFloat(this.state.mag)) : true
        );
        let vis_pass = (this.state.vis ?
          (parseFloat(t.percent_transit_observable) >= parseFloat(this.state.vis)) : true
        );
        let depth_pass = (this.state.depth ?
          (parseFloat(t["depth(ppt)"]) >= parseFloat(this.state.depth)) : true
        );
        let name_pass = (this.state.name ?
          ((t.Name).toLowerCase().includes(this.state.name.toLowerCase()) && this.state.name !== '') : true
        );

        // if transit matches all filters then push
        if (mag_pass && name_pass && depth_pass && vis_pass) {
          new_list.push(t);
          console.log(t)
        }
      });

      // push the new list
      if (new_list) 
        this.props.returnTransits(new_list);
    });
  }

  // Return component
  render() {
    return (
      <Box className="search__filter__section"
        borderBottom="1px solid #222"
        mt="-10px"
        pb="25px">

        <Dropdown
          text="Filters"
          open={false}
        >
          <Box className="filters__model" style={{ paddingTop: "15px", marginTop: "15px" }}>
            <Input
              i={faSearch}
              {...inputAttrs}
              onKeyUp={e => this.searchTransits({ name: (e.target.value ? e.target.value : "empty") })}
              placeholder="Name..."
            />

            <Input
              i={faRulerVertical}
              {...inputAttrs}
              onKeyUp={e => this.searchTransits({ depth: (e.target.value ? e.target.value : "empty") })}
              placeholder="Min depth..."
            />

            <Input
              i={faPercentage}
              {...inputAttrs}
              onKeyUp={e => this.searchTransits({ vis: (e.target.value ? e.target.value : "empty") })}
              placeholder="Min percent visible..."
            />

            <Input
              i={faStar}
              {...inputAttrs}
              onKeyUp={e => this.searchTransits({ mag: (e.target.value ? e.target.value : "empty") })}
              placeholder="Max magnitude..."
            />
          </Box>
        </Dropdown>

        {this.state.searchResults.query &&
          <Heading className="search__results" {...headingStyles}>
            {this.state.searchResults.count}
            {'  '}
            <span style={{ color: 'white' }}>results</span>
          </Heading>
        }
      </Box>
    );
  }
};

export default Search;