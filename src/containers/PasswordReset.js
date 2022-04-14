import React from 'react';
import {
  FormControl,
  FormLabel,
  Text
} from "@chakra-ui/react"
import { Input, Button, H1 } from '../library/CustomUI.js';
import {
  faEnvelope
} from "@fortawesome/free-solid-svg-icons";
import { POST } from '../functions/post.js';
import * as paths from '../paths.js';

class ResetPasswordForm extends React.Component {
  state = {
    email: '',
    error: '',
    done: false
  };

  setField = (value, field) => {
    this.setState({
      [field]: value
    });
  }

  sendData = () => {
    if (this.state.email) {
      POST(paths.RESET_PASSWORD_API, {
        email: this.state.email
      }).then(r => {
        console.log(r);

        this.setState({
          done: true
        });
      });
    }
    else {
      this.setState(
        { error: "Please enter an email" }
      );
    }
  }

  render() {
    return (
      <form>
        <H1 mb={10}>Reset Password</H1>

        {this.state.done ?
          <h3>A reset link has been sent to your email.</h3>
          :
          <>
            {this.state.error &&
              <Text color="error.500" mt={5}>{this.state.error}</Text>}

            <FormControl id="username" mt={5}>
              <FormLabel>Email address</FormLabel>
              <Input
                i={faEnvelope}
                onChange={event =>
                  this.setField(event.target.value, 'email')}
                placeholder="Email..."
                autoComplete="true" />
            </FormControl>

            <FormControl id="submit" mt={5} mb={5} textAlign="center">
              <Button onClick={this.sendData}>
                Send
              </Button>
            </FormControl>
          </>}
      </form>
    );
  }
}

export default ResetPasswordForm;