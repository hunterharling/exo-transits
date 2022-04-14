import React from "react";
import { Redirect, Switch, Route } from "react-router-dom";
import * as paths from "./paths.js"

// Components
import Page404 from "./components/Layout/404.js";
import AboutPage from "./containers/About.js";
import Login from "./containers/Login";
import Signup from "./containers/Signup";
import TransitList from "./containers/TransitList.js";
import FullTransit from "./containers/TransitFull.js";
import Planner from "./containers/Planner.js";
import Settings from "./containers/Settings.js";
import ResetPasswordForm from "./containers/PasswordReset.js";
import ChangePasswordForm from "./containers/PasswordChange.js";
import DataSources from "./containers/DataSources.js";

// Status
import { OnlineStatusProvider } from "./useOnlineStatus";

class BaseRouter extends React.Component {
  hasMounted = false;

  componentDidMount() {
    this.hasMounted = true;
  }

  render() {
    const Auth = ({ children }) => {
      return (
        <>
          {this.props.auth ?
            <>
              {children}
            </>
            :
            (this.hasMounted ?
              <Redirect to="/login" /> : null
            )}
        </>
      );
    }

    return (
      <OnlineStatusProvider>
        <Switch>
          <Route exact path="/">
            <Redirect to="/about" />
          </Route>

          <Route exact path="/login" component={() => this.props.auth ?
            <Redirect to="/transits" /> :
            <Login {...this.props} />
          } />

          <Route exact path="/signup" component={() => this.props.auth ?
            <Redirect to="/transits" />
            :
            <Signup {...this.props} />}
          />

          <Route exact path="/transits">
            <TransitList {...this.props} />
          </Route>

          <Route exact path="/transit/full" render={props =>
            <FullTransit location={this.location} {...this.props} transit={props.transit} />}
          />

          <Route exact path="/planner">
            <Auth>
              <Planner {...this.props} />
            </Auth>
          </Route>

          <Route exact path="/about">
            <AboutPage />
          </Route>

          <Route exact path="/data-sources">
            <DataSources />
          </Route>

          <Route exact path="/settings">
            <Auth>
              <Settings {...this.props} />
            </Auth>
          </Route>

          <Route exact path={paths.RESET_PASSWORD}>
            <ResetPasswordForm {...this.props} />
          </Route>

          <Route exact path={paths.CHANGE_PASSWORD}>
            <ChangePasswordForm {...this.props} />
          </Route>

          <Route path="">
            <Page404 />
          </Route>
        </Switch>
      </OnlineStatusProvider>
    );
  }
}

export default BaseRouter;