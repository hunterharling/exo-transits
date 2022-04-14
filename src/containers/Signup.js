import React from 'react';
import {
  FormControl,
  FormLabel,
  Text
} from "@chakra-ui/react"
import { signupUser, setLogin } from '../functions/auth.js';
import { POST } from '../functions/post.js';
import { LOGIN_API, SIGNUP_API } from '../paths.js';
import { Input, Button, H1 } from '../library/CustomUI.js';
import {
  faUser,
  faKey,
  faEnvelope
} from "@fortawesome/free-solid-svg-icons";
import { OnlineStatusWrapper } from '../useOnlineStatus.js';

// Signup form
class Signup extends React.Component {
  state = {
    username: '',
    password1: '',
    password2: '',
    email: '',
    usernameIsInvalid: '',
    email_error: '',
    password1IsInvalid: '',
    password2IsInvalid: ''
  };

  setField = (text, field) => {
    this.setState({
      [field]: text
    });
  }

  resetErrors = () => {
    this.setState({
      usernameIsInvalid: '',
      email_error: '',
      password1IsInvalid: '',
      password2IsInvalid: ''
    });
  }

  handleForm = () => {
    if (this.state.username
      && this.state.password1
      && this.state.email
      && this.state.password2) {

      POST(SIGNUP_API,
        {
          username: this.state.username,
          password1: this.state.password1,
          email: this.state.email,
          password2: this.state.password2
        }).then(response => {
          console.log(response);

          if (response.status === 200 || response.status === 201) {
            // POST(USERNAME_API, {
            //   full_name: this.state.full_name,
            //   email: this.state.email,
            //   username: this.state.username
            // }).then(r => {
            //   console.log(r);
            POST(LOGIN_API, {
              username: this.state.username,
              password: this.state.password1
            }).then(res => {
              setLogin(res, this.props.login);
              // POST(FINISH_REG_API, { email: this.state.email });
            });
            // });
          }
          else {
            Object.keys(response.data).map(key => {
              let newKey = key + "_error";
              this.resetErrors();

              this.setState({
                [newKey]: response.data[key]
              });
              return '';
            });

          }
        });
    }
    else {
      this.setState({
        error: "All fields are required"
      });
      console.log(this.state)
    }
  }

  render() {
    return (
      <form>
        <H1 mb={10}>Signup</H1>
        
        <OnlineStatusWrapper>
          <FormControl id="email" mt={5} mb={5}>
            <FormLabel>Email</FormLabel>
            <Input
              i={faEnvelope}
              onChange={event =>
                this.setField(event.target.value, 'email')}
              placeholder="Email..." />
            {this.state.email_error ?
              <Text color="error.500" fontSize="12px" mt="3px">{this.state.email_error}</Text> : null}
          </FormControl>

          <FormControl id="username" mt={5}>
            <FormLabel>Username</FormLabel>
            <Input
              i={faUser}
              onChange={event =>
                this.setField(event.target.value, 'username')}
              placeholder="Username..." />
            {this.state.usernameIsInvalid &&
              <Text color="error.500" fontSize="12px" mt="3px">{this.state.usernameIsInvalid.map(e => e)}</Text>}
          </FormControl>

          <FormControl id="password" mt={5} mb={5}>
            <FormLabel>Password</FormLabel>
            <Input
              i={faKey}
              onChange={event =>
                this.setField(event.target.value, 'password1')}
              type="password"
              placeholder="Password..." />
            {this.state.password1IsInvalid &&
              <Text color="error.500" fontSize="12px" mt="3px">{this.state.password1IsInvalid}</Text>}
          </FormControl>

          <FormControl id="password2" mt={5} mb={5}>
            <FormLabel>Confirm Password</FormLabel>
            <Input
              i={faKey}
              onChange={event =>
                this.setField(event.target.value, 'password2')}
              type="password"
              focusBorderColor="primary.700"
              placeholder="Repeat password..." />
            {this.state.password2IsInvalid &&
              <Text color="error.500" fontSize="12px" mt="3px">
                {this.state.password2IsInvalid}</Text>}
          </FormControl>

          <FormControl id="submit" mt={5} mb={5} textAlign="center">
            <Button onClick={() =>
              this.handleForm()}>
              Sign Up
            </Button>
          </FormControl>
        </OnlineStatusWrapper>
      </form>

    );
  }
}

export default Signup;