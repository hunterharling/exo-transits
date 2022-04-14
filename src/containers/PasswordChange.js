import React from 'react';
import {
  FormControl,
  FormLabel,
  Text
} from "@chakra-ui/react"
import { Input, Button, H1 } from '../library/CustomUI.js';
import {
  faLock
} from "@fortawesome/free-solid-svg-icons";
import { POST } from '../functions/post.js';
import { setLogin } from '../functions/auth.js';
import * as paths from '../paths.js';

class ChangePasswordForm extends React.Component {
  state = {
    pw: '',
    pw2: '',
    error: '',
    done: false
  };

  setField = (value, field) => {
    this.setState({
      [field]: value
    });
  }

  sendData = () => {
    let key = (window.location.search.split("=")[1] || "none")
    let pwIsValid = (this.state.pw.length >= 8 && !(
      this.state.pw.includes("(") ||
      this.state.pw.includes(")") ||
      this.state.pw.includes("{") ||
      this.state.pw.includes("}") ||
      this.state.pw.includes("'") ||
      this.state.pw.includes('"') ||
      this.state.pw.includes(";") ||
      this.state.pw.includes("<") ||
      this.state.pw.includes(">") ||
      this.state.pw.includes("=") ||
      this.state.pw.includes("`") ||
      this.state.pw.includes("~") ||
      this.state.pw.includes("*") ||
      this.state.pw.includes("^") ||
      this.state.pw.includes("$") ||
      this.state.pw.includes(":")));
    if (this.state.pw && (this.state.pw === this.state.pw2) && key !== "none" && pwIsValid) {
      this.setState({
        err: ""
      });

      POST(paths.CHANGE_PASSWORD_API, {
        pw: this.state.pw,
        key: key
      }).then(r => {
        console.log(r);
        POST(paths.LOGIN_API, {
          username: r.data.username,
          password: this.state.pw
        }).then(res => {
          setLogin(res, this.props.login);
          this.setState({
            done: true
          })
        });
      });
    }
    else {
      this.setState(
        { error: "Please enter a password that greater than 8 characters, includes letters, digits and @/./+/-/_ only, and isn't too common. Also ensure that the passwords match" }
      );
    }
  }

  render() {
    return (
      <form>
        <H1 mb={10}>Change Password</H1>

        {this.state.done ?
          <h3>
            Password reset!
          </h3>
          :
          <>
            {this.state.error &&
              <Text color="error.500" mt={5}>{this.state.error}</Text>}

            <FormControl id="username" mt={5}>
              <FormLabel>New Password</FormLabel>
              <Input
                i={faLock}
                type="password"
                onChange={event =>
                  this.setField(event.target.value, 'pw')}
                placeholder="Password..."
                autoComplete="true" />
            </FormControl>

            <FormControl id="username" mt={5}>
              <FormLabel>Repeat Password</FormLabel>
              <Input
                i={faLock}
                type="password"
                onChange={event =>
                  this.setField(event.target.value, 'pw2')}
                placeholder="Confirm Password..."
                autoComplete="true" />
            </FormControl>

            <FormControl id="submit" mt={5} mb={5} textAlign="center">
              <Button onClick={this.sendData}>
                Change
              </Button>
            </FormControl>
          </>}
      </form>
    );
  }
}

export default ChangePasswordForm;