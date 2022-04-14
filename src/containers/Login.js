import React from 'react';
import { Link } from 'react-router-dom';
import {
  FormControl,
  FormLabel,
  Text
} from "@chakra-ui/react"
import { setLogin } from '../functions/auth.js';
import { POST } from '../functions/post.js';
import { LOGIN_API, RESET_PASSWORD } from '../paths.js';
import { Input, Button, H1 } from '../library/CustomUI.js';
import {
  faUser,
  faLock
} from "@fortawesome/free-solid-svg-icons";
import { OnlineStatusWrapper } from '../useOnlineStatus.js';

class Login extends React.Component {
  state = {
    username: '',
    password: '',
    error: ''
  };

  setField = (value, field) => {
    this.setState({
      [field]: value
    });
  }

  handleForm = () => {
    if (this.state.password && this.state.username) {

      // post to login user
      POST(
        LOGIN_API,
        {
          username: this.state.username,
          password: this.state.password
        }
      ).then(response => {
        console.log(response.data);

        // if success then set token
        if (response.status === 200 || response.status === 201) {
          setLogin(response, this.props.login)
        }
        else {
          this.setState({
            error: "Incorrect username or password"
          });
        }
      });
    }
    else {
      this.setState({
        error: "All fields required"
      });
    }
  }

  render() {
    return (

      <form>
        <H1 mb={10}>Login</H1>
        <OnlineStatusWrapper>
          {this.state.error &&
            <Text color="error.500" mt={5}>{this.state.error}</Text>}

          <FormControl id="username" mt={5}>
            <FormLabel>Username</FormLabel>
            <Input
              i={faUser}
              onChange={event =>
                this.setField(event.target.value, 'username')}
              placeholder="Username..."
              autoComplete="true" />
          </FormControl>

          <FormControl id="password" mt={5} mb={5}>
            <FormLabel>Password</FormLabel>
            <Input
              i={faLock}
              onChange={event =>
                this.setField(event.target.value, 'password')}
              type="password"
              placeholder="Password..."
              autoComplete="true" />
          </FormControl>

          <FormControl id="submit" mt={5} mb={5} textAlign="center">
            <Button onClick={this.handleForm}>
              Login
            </Button>
            <FormLabel mt={5} textAlign="center">
              Forgot your password?
              <Link to={RESET_PASSWORD} style={{ color: "#3968c4", marginLeft: "10px" }}>Reset passowrd</Link>
            </FormLabel>
          </FormControl>
        </OnlineStatusWrapper>
      </form>
    );
  }
}

export default Login;
