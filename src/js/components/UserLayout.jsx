import React from "react";
import FormInput from "./contactForm/ContactInput.jsx"
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
    var actionButton = this.props.onCreate ?
      <a href="#" class="btn btn-default" onClick={() => { this.props.createHandler(this.state.user); }}>Create</a>:
      <a href="#" class="btn btn-primary" onClick={() => { this.props.loginHandler(this.state.user); }}>Login</a>;
    var hTag = this.props.onCreate ? <h3>Create Account</h3> : <h3>Sign In</h3>;

    return (
      <div>
        {hTag}
        <form style={formStyles}>
          <FormInput onInputChange={this.onInputChange}
            value={user.email}
            name="email"
            placeholder="some email" />

          <FormInput onInputChange={this.onInputChange}
            value={user.password}
            name="password"
            placeholder="some password" />
          {actionButton}
        </form>
      </div>
    );
  }
}
