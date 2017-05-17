import React from "react"

import ContactLayout from "./Layouts/ContactLayout.jsx"
import UserLayout from "./Layouts/UserLayout.jsx"
import UserStorage from "../services/UserSession.js"
import Api from "../services/ContactsApi"
import Header from "./Base/Header.jsx"

const emptyUser = () => {
  return {
    email: '',
    password: '',
    contacts: []
  }
}

export default class App extends React.Component {
  constructor(props) {
    super(props)
    let hasUserSession = !!UserStorage.getUser()
    this.state = {
      hasUserSession: hasUserSession,
      onCreate: false,
      user: hasUserSession ? UserSession.getUser() : emptyUser()
    }
  }

  loginHandler = (user) => {
    Api.authenticateUser(user).then(
      (response) => {
        let { _id } = response.data
        UserSession.setUser({
          _id: _id,
          email: user.email,
          password: user.password
        })
        this.setState({hasUserSession: true})
      },
      (error) => {
        console.log(error.response.data)
      }
    )
  }

  createHandler = (user) => {
    Api.createUser(user).then(
      (response) => {
        let { _id } = response.data
        UserSession.setUser({
          _id: _id,
          email: user.email,
          password: user.password
        })
        this.setState({ hasUserSession: true })
      },
      (error) => {
        console.log(error.response.data)
      }
    )
  }

  logoutLinkHandler = () => {
    UserSession.removeUser()
    this.setState({
      hasUserSession: false,
      user: emptyUser()
    })
  }

  createLinkHandler = () => {
    this.setState({onCreate: true})
  }

  loginLinkHandler = () => {
    this.setState({onCreate: false})
  }

  render() {
    var body, actionLink

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
      )
      actionLink = this.state.onCreate ?
        <a onClick={this.loginLinkHandler}>Login</a> :
        <a onClick={this.createLinkHandler}>Create</a>
    }

    return (
      <div>
        <Header>
          {actionLink}
        </Header>
        <div className="container content">
          {body}
        </div>
      </div>
    )
  }
}
