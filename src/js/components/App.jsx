import React from "react";
import ReactDOM from "react-dom";

import ContactLayout from "./ContactLayout";
import UserLayout from "./UserLayout.jsx";
import UserStorage from "../services/UserSession.js";
import Api from "../services/ContactsApi"

export default class App extends React.Component {
  constructor(props) {
    super(props);
    var hasUserSession = !!UserStorage.getUser();
    this.state = {
      hasUserSession: hasUserSession,
      onCreate: false,
      user: hasUserSession ? UserSession.getUser() : this.emptyUser()
    }
  }

  emptyUser() {
    return {
      email: '',
      password: '',
      contacts: []
    };
  }

  loginHandler = (user) => {
    Api.authenticateUser(user).then(
      (response) => {
        var userId = response.data._id;
        UserSession.setUser({
          _id: userId,
          email: user.email,
          password: user.password
        });
        this.setState({hasUserSession: true});
      },
      (error) => {
        console.log(error.response.data)
      }
    );
  }

  createHandler = (user) => {
    Api.createUser(user).then(
      (response) => {
        var userId = response.data._id;
        UserSession.setUser({
          _id: userId,
          email: user.email,
          password: user.password
        });
        this.setState({ hasUserSession: true });
      },
      (error) => {
        console.log(error.response.data)
      }
    );
  }

  logoutLinkHandler = () => {
    UserSession.removeUser();
    this.setState({
      hasUserSession: false,
      user: { email: '', password: ''}
    })
  }

  createLinkHandler = () => {
    this.setState({onCreate: true});
  }

  loginLinkHandler = () => {
    this.setState({onCreate: false});
  }

  render() {
    var body, actionLink;

    if (this.state.hasUserSession) {
      actionLink = <a onClick={this.logoutLinkHandler}>Logout</a>
      body = <ContactLayout contacts={this.state.user.contacts} />
    }
    else {
      body = (
        <UserLayout
          loginHandler={this.loginHandler}
          createHandler={this.createHandler}
          onCreate={this.state.onCreate} />
      );
      actionLink = this.state.onCreate ?
        <a onClick={this.loginLinkHandler}>Login</a> :
        <a onClick={this.createLinkHandler}>Create</a>;
    }

    return (
      <div>
        <header>
          {actionLink}
        </header>
        {body}
      </div>
    )
  }
}
