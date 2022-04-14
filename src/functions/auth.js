import { POST, GET } from '../functions/post.js';
import { LOGIN_API, SIGNUP_API, USER_DATA } from '../paths.js';

// post credentials to db
export async function loginUser(username, password, login_fxn, state = null) {
  if (password && username) {
    POST(
      LOGIN_API,
      {
        username: username,
        password: password
      }
    ).then(response => {
      console.log(response.data);

      // if success then set token
      if ((response.status === 200) || (response.status === 201)) {
        let key = response.data.key;
        localStorage.setItem('token__auth', key);

        // set expiration date
        let now = new Date();
        now.setDate(now.getDate() + 28)
        localStorage.setItem('expiration', now)

        // get user info
        GET(USER_DATA, key).then(res => {
          localStorage.setItem('user', JSON.stringify(res.data));
        });

        // login with token
        login_fxn();

        return ({
          error: ''
        });
      }

      // if bad user info
      else {
        if (state)
          state({
            error: "Incorrect username or password"
          });
        return ({
          error: 'Incorrect username or password'
        });
      }
    }).catch(err => { // anything else
      console.log(err);
      if (state)
        state({
          error: "Incorrect username or password"
        });

      return ({
        error: 'Incorrect username or password'
      });
    });
  }

  // when a field is blank
  else {
    return ({
      error: 'All fields required'
    });
  }
}

// user creation
export const signupUser = (state, setState, login_fxn, resetErrors) => {
  if (state.username
    && state.password
    && state.email
    && state.password2) {

    POST(SIGNUP_API,
      {
        username: state.username,
        password1: state.password,
        email: state.email,
        password2: state.password2
      }).then(response => {
        if (response.status === 200 || response.status === 201) {
          loginUser(
            state.username,
            state.password,
            login_fxn
          ).then(res => {
            if (res) console.log(res);
          });
        }
        else {
          Object.keys(response.data).map(key => {
            let newKey = key + "_error";
            resetErrors();

            setState({
              [newKey]: response.data[key]
            });
            return '';
          });
        }
    });
  }
  else {
    setState({
      error: "All fields are required"
    });
  }
}

// remove token from storage
export const logout = (set_state) => {
  localStorage.removeItem("token__auth");
  localStorage.removeItem("user");

  set_state({
    auth: false,
    username: ''
  });
}

// get token from storage
export const login = (set_state) => {
  const token = localStorage.getItem("token__auth");
  const user = JSON.parse(localStorage.getItem("user"));
  const expiration = Date.parse(localStorage.getItem('expiration'));

  let isAuthenticated = true;
  if (token == null) isAuthenticated = false;
  if (Date.now() >= expiration) {
    isAuthenticated = false;
  }
  else {
    console.log(expiration);
    console.log(Date.now());
  }

  set_state({
    auth: isAuthenticated,
    token: token,
    user: user
  });
}

export const setLogin = (response, loginApp) => {
  let key = response.data.key;
  localStorage.setItem('token__auth', key);

  // set expiration date
  let now = new Date();
  now.setDate(now.getDate() + 28);
  localStorage.setItem('expiration', now);

  // get user info
  GET(USER_DATA, key).then(res => {
    localStorage.setItem('user', JSON.stringify(res.data));
  });

  // login with token
  loginApp();
}