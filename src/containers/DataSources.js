import React from 'react';
import { ColorBox, H1 } from '../library/CustomUI';

const DataSources = (props) => {
  return (
    <>
      <H1>Data Sources</H1>

      <ColorBox text="astro.swarthmore.edu, NASA Exoplanet archive" identifier="Transit data" />
      <ColorBox identifier="Sky maps" text="Alidin maps" />
      <ColorBox identifier="Star info" text="Simbad" />
    </>
  );
}

export default DataSources;