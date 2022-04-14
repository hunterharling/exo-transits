import React from 'react';
import ReactGA from 'react-ga';
import { Button } from '../library/CustomUI';
import {
  Divider,
  Container,
  Box,
  Text,
  Heading,
  FormControl,
  Input,
  Textarea,
  Spinner,
  VStack,
  FormLabel
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import * as paths from '../paths.js';
import { POST } from '../functions/post';

function Feature({ title, desc, ...rest }) {
  return (
    <Box
      p={5}
      shadow="md"
      borderWidth="1px"
      flex="1"
      borderRadius="md"
      // borderColor="#2e61c6"
      borderColor="var(--primary)"
      {...rest}
    >
      <Heading fontSize="xl">{title}</Heading>
      <Text mt={4}>{desc}</Text>
    </Box>
  )
}

function InfoStack() {
  return (
    <Box
      className="feature__box"
      display="flex"
      flexWrap="wrap"
      justifyContent="center">
      <Link to={paths.TRANSITS}>
        <Feature
          height="185px"
          marginX="15px"
          mt="15px !important"
          minW="250px !important"
          maxW="250px !important"
          title="Transit Predictor"
          color="#979797"
          desc="Complete with exoplanet and host star information, interactive finding chart, and more."
        />
      </Link>

      <Feature
        marginX="15px"
        height="185px"
        minW="250px !important"
        maxW="250px !important"
        mt="15px !important"
        title="Planner"
        color="#979797"
        desc="Add upcoming transits to your calendar and receive optional alerts."
      />
    </Box>
  )
}

class AboutPage extends React.Component {
  state = {
    name: "",
    email: "",
    msg: "",
    sent: false,
    inProgress: false
  };

  componentDidMount() {
    ReactGA.initialize(this.props.ga);
    ReactGA.set({ page: window.location.pathname });
    ReactGA.pageview(window.location.pathname + window.location.search);
  }

  sendData = () => {
    if (this.state.name && this.state.email && this.state.msg) {
      this.setState({ inProgress: true });
      POST(paths.CONTACT_API, this.state).then(r => {
        console.log(r.data)
        if (r.data.response) {
          this.setState({ sent: true });
        }
      });
    }
  };

  setField = (value, field) => {
    this.setState({
      [field]: value
    });
  }

  render() {
    return (
      <>
        <Heading
          textAlign="center"
          size="3xl"
          mb="80px"
          mt="80px">
          Easily Plan Exoplanet Observations
        </Heading>

        <Container
          maxWidth="90vw"
          fontSize="16px"
          mb="150px"
          textAlign="center">
          <p style={{ color: "#979797", fontWeight: "500" }}>
            Exo Transits is a web app that allows astronomers and exoplanet researchers to plan upcoming exoplanet observations.
            <br />
            <br />
            Upcoming transit data is from NASA's Exoplanet Archive.
            <br />
            <br />
          </p>
          
          <Heading fontSize="2xl" style={{
            marginTop: "50px",
            textAlign: "center",
            fontWeight: "600",
            marginBottom: "25px"
          }}>
            What are exoplanets?
          </Heading>
          <p style={{ color: "#979797", fontWeight: "500" }}>
            Exoplanets are planets that orbit stars beyond the solar system.<br /><br />
            The study of exoplanets is still relatively new; the first confirmed detection of an exoplanet was in 1992!
            Since then, astronomers have confirmed the discovery of over 4,000 exoplanets, and there are thousands of current exoplanet candidates.<br /><br />
            A main method used to discover exoplanets is by studying the light of an exoplanet's host star as the planet moves in front of, or transits, the star.
            With this method, however, one must have accurate timing of their observations, which is why a planner such as Exo Transits is useful.
          </p>
          
          <Heading fontSize="2xl" style={{
            marginTop: "50px",
            textAlign: "center",
            fontWeight: "600",
            marginBottom: "25px"
          }}>
            Exo Transits has multiple features, including
          </Heading>

          <InfoStack />
          <Divider marginY="45px" />
          <Heading fontSize="2xl">Contact Us</Heading>

          {this.state.sent ?
            <Heading
              color="#4d78ce"
              fontSize="20px"
              fontWeight="600">
              Thank you for contacting us!
            </Heading>
            :
            <VStack id="contact__form"
              spacing="20px"
              direction={["column"]}>
              <FormControl id="email" isRequired>
                <FormLabel>Email</FormLabel>
                <Input placeholder="Email address..." onChange={(e) => this.setField(e.target.value, "email")} />
              </FormControl>

              <FormControl id="name" isRequired>
                <FormLabel>Name</FormLabel>
                <Input
                  placeholder="Your name..."
                  onChange={(e) => this.setField(e.target.value, "name")} />
              </FormControl>

              <FormControl id="message" isRequired>
                <FormLabel>Message</FormLabel>
                <Textarea
                  placeholder="A message..."
                  onChange={(e) => this.setField(e.target.value, "msg")} />
              </FormControl>

              {!this.state.inProgress ?
                <Button
                  onClick={this.sendData}>
                  Send
                </Button>
                :
                <Spinner
                  thickness="4px"
                  speed="0.65s"
                  emptyColor="#2f2f2f"
                  color="primary.500"
                  size="xl"
                />
              }
            </VStack>}
        </Container>
      </>
    );
  }
}

export default AboutPage;