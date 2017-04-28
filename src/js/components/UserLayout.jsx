import React from "react";
import FormInput from "./contactForm/ContactInput.jsx"
import Api from "../services/ContactService"
import UserSession from "../services/UserSession"



export default class UserLayout extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      user: {
        email: '',
        password: ''
      }
    }
  }

  checkedLoggedIn = (e) => {
    var user = this.state.user;
    Api.authenticateUser(user).then(
      (response) => {
        var userId = response.data.userId;
        UserSession.setUser({
          _id: userId,
          email: user.email,
          password: user.password
        })
      },
      (error) => {
        console.log(error.response.data)
      }
    );
  }

  onInputChange = (name, value) => {
    console.log(name, value);
    var user = Object.assign({}, this.state.user);
    user[name] = value
    this.setState({ user: user })
  }

  render() {
    var formStyles = {
      padding: "2rem"
    };
    var user = this.state.user;

    return (
      <div>
        <h3> Sign In </h3>
        <form style={formStyles}>
          <FormInput onInputChange={this.onInputChange}
            value={user.email}
            name="email"
            placeholder="some email" />

          <FormInput onInputChange={this.onInputChange}
            value={user.password}
            name="password"
            placeholder="some password" />

          <a href="#" class="btn btn-primary" onClick={this.checkedLoggedIn}>Login</a>
        </form>
      </div>
    );
  }
}
