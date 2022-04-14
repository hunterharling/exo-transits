import React, { Component } from 'react';
import BaseRouter from './routes';
import { QueryClient, QueryClientProvider } from "react-query";

// Google Analytics
import ReactGA from 'react-ga';

// Chakra
import CustomLayout from './containers/Layout';
import { ChakraProvider, ThemeProvider } from "@chakra-ui/react";
import theme from "./theme/theme.js";

// Functions
import { setColorMode } from "./functions/generic.js";
import { login, logout } from "./functions/auth.js";
import { pwaStatusCheck } from './PWAScritps.js';
import { GET } from './functions/post';
import { UPDATESW } from './paths';

// CSS
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import "./theme/App.scss";
import "./theme/mobile.scss";

const queryClient = new QueryClient();

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: 0,
      height: 0,
      auth: false,
      token: '',
      user: null,
      header_title: '',
      offline: false,
      ga: 'UA-_-1'
    };
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  }

  componentDidMount() {
    // Hard refresh sw if new update
    GET(UPDATESW).then(res => {
      if (res.data.hasUpdate) {
        if (localStorage.getItem("hasUpdate") && (res.data.hasUpdate !== localStorage.getItem("hasUpdate"))) {
          navigator.serviceWorker.ready.then(r => {
            r.unregister();
          });
          localStorage.setItem("hasUpdate", res.data.hasUpdate);
          window.location.reload(true);
        }
        else {
          localStorage.setItem("hasUpdate", res.data.hasUpdate);
        }
      }
      else {
        localStorage.setItem("hasUpdate", "0000");
      }
    });

    ReactGA.initialize(this.state.ga);

    // PWA
    pwaStatusCheck();

    // Check if offline
    if (navigator.onLine)
      this.setState({ offline: true });

    // init darkmode
    setColorMode();

    // check auth
    login(this.setState.bind(this))

    // setup window dimensions
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }

  setHeader = (header) => {
    this.setState({
      header_title: header
    });
  }

  render() {
    return (
      <ChakraProvider>
        <ThemeProvider theme={theme}>
          <QueryClientProvider client={queryClient}>
            <CustomLayout
              {...this.state}
              logout={() => logout(this.setState.bind(this))}
              login={() => login(this.setState.bind(this))}
            >
              <div className="app">
                <BaseRouter
                  {...this.state}
                  setHeader={this.setHeader.bind(this)}
                  logout={() => logout(this.setState.bind(this))}
                  login={() => login(this.setState.bind(this))}
                />
              </div>
            </CustomLayout>
          </QueryClientProvider>
        </ThemeProvider>
      </ChakraProvider>
    );
  }
}

export default App;