import React from 'react';
import { Link } from 'react-router-dom';
import {
  FormControl,
  FormLabel,
  FormHelperText,
  Text,
  Switch
} from "@chakra-ui/react"
import {
  faUser,
  faEnvelope,
  faMapMarkerAlt
} from "@fortawesome/free-solid-svg-icons";
import { Input, Dropdown, H1 } from '../library/CustomUI.js';
import { POST } from '../functions/post.js';
import * as paths from '../paths.js';

class Settings extends React.Component {
  state = {
    user: this.props.user,
    non_form_error: '',
    account_form_error: '',
    user_form_error: '',
    success: '',
    email: '',
    username: '',
    password: '',
    lat: 0,
    lng: 0,
    valid: false,
    email_invalid: false,
    username_invalid: false,
    lat_invalid: false,
    lng_invalid: false,
    alertStatus: false
  }

  componentDidMount() {
    if (this.props.auth) {
      let user_ = JSON.parse(localStorage.getItem("user"));
      this.setState({
        user: user_,
        username: user_.username,
        email: user_.email,
        lat: user_.lat,
        lng: user_.lng,
        alertStatus: (user_.alertStatus ? user_.alertStatus : false)
      }, () => console.log(this.state));
    }
  }

  handleForm = () => {
    POST(paths.UPDATE_USERPROFILE, {
      username: this.state.username,
      password: this.state.password,
      email: this.state.email,
      lat: this.state.lat,
      lng: this.state.lng,
      alertStatus: this.state.alertStatus
    }).then(res => {
      console.log(res);

      if (res.data.message === "success") {
        this.setState({
          success: "Success! Your information has been updated.",
          valid: false
        });

        localStorage.setItem("user", JSON.stringify(res.data.user));
      }
      else {
        this.setState({
          account_form_error: "Bad request... Please try again.",
          user_form_error: "Bad request... Please try again."
        });
      }
    });
  }

  setField = (field, value) => {
    if (field === "alertStatus") {
      let s1 = this.state.alertStatus;
      this.setState({
        alertStatus: !s1
      }, () => this.validData(this.handleForm));
    }
    else {
      this.setState({
        [field]: value
      }, () => this.validData(this.handleForm));
    }
    console.log(this.state)

  }

  validData = (handler = null) => {
    this.setState({
      email_invalid: false,
      username_invalid: false,
      lat_invalid: false,
      lng_invalid: false,
      non_form_error: '',
      account_form_error: '',
      user_form_error: '',
    });

    // all fields have value
    if (this.state.email && this.state.username) {

      // valid email
      if (!this.state.email.includes(".") || !this.state.email.includes("@")) {
        this.setState({
          account_form_error: "Invalid email",
          email_invalid: true
        });
      }
      else {
        // check for valid floats
        if (this.state.lat !== "NaN" && this.state.lat && this.state.lng && this.state.lng !== "Nan") {
            handler();
        }
        else {
          this.setState({
            user_form_error: "Invalid latitude or longitude",
            lat_invalid: true,
            lng_invalid: true
          });
        }
      }
    }
    else {
      this.setState({
        non_form_error: "All fields required"
      })
    }
  }

  render() {
    return (
      <>
        {this.props.width >550 && <H1>Settings</H1>}
        <form className="settings">
          <Text className="error" mt="35px" mb="-10px">{this.state.non_form_error}</Text>

          <Dropdown pl={10} fontSize="18px" color="light.300" text="Account" open={true}>
            <Text className="error" mt="15px">{this.state.account_form_error}</Text>
            <FormControl id="username" mt={5}>
              <FormLabel>Username</FormLabel>
              <Input
                i={faUser}
                id="username"
                label="Username"
                defaultValue={(this.state.user ? this.state.user.username : '')}
                disabled
                className='' />
              <FormHelperText>Usernames cannot be changed.</FormHelperText>
            </FormControl>

            <FormControl mt={5}>
              <Text>Click
                {" "}
                <Link to={paths.RESET_PASSWORD} style={{color: "var(--primary)"}}>here</Link>
                {" "}to change your password
              </Text>
            </FormControl>

            <FormControl id="email" mt={5}>
              <FormLabel mt="15px">Email</FormLabel>
              <Input
                i={faEnvelope}
                onChange={e => this.setField("email", e.target.value)}
                id="email"
                label="Email"
                isInvalid={this.state.email_invalid}
                defaultValue={this.state.user ? this.state.user.email : ''} />
            </FormControl>
          </Dropdown>

          <Dropdown pl={10} fontSize="18px" color="light.300" text="Other">
            <Text className="error" mt="15px">{this.state.user_form_error}</Text>
            <FormControl mt={5}>
              <FormLabel>Latitude</FormLabel>
              <Input
                i={faMapMarkerAlt}
                onChange={e => this.setField("lat", parseFloat(e.target.value, 10))}
                id="lat"
                placeholder="Latitude..."
                isInvalid={this.state.lat_invalid}
                defaultValue={this.state.user ? this.state.user.lat : ''}
              />
            </FormControl>
            
            <FormControl mt={5}>
              <FormLabel>Longitude</FormLabel>
              <Input
                i={faMapMarkerAlt}
                onChange={e => this.setField("lng", parseFloat(e.target.value, 10))}
                id="lng"
                placeholder="Longitude..."
                isInvalid={this.state.lng_invalid}
                defaultValue={this.state.user ? this.state.user.lng : ''}
              />
            </FormControl>

            <FormControl mt={5} mb="150px !important">
              <FormLabel>Alerts: <span style={{ color: "#2e61c6" }}>
                  {this.state.alertStatus ? "ON" : "OFF"}
                </span>
              </FormLabel>
              <Switch
                onChange={(e) => this.setField("alertStatus", !this.state.alertStatus)}
                size="lg"
                defaultIsChecked={this.state.alertStatus}
                colorScheme="grey"/>
            </FormControl>
          </Dropdown>
        </form>
      </>
    );
  }
}

export default Settings;