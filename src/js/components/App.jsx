import React from "react"

import ContactLayout from "./Layouts/ContactLayout.jsx"
import UserLayout from "./Layouts/UserLayout.jsx"
import UserStorage from "../services/UserSession.js"
import Api from "../services/ContactsApi"
import Header from "./Base/Header.jsx"

export default class App extends React.Component {

  constructor(props) {
    super(props)
    let hasUserSession = !!UserStorage.getUser()
    this.state = {
      hasUserSession: hasUserSession,
      currentPage: 'Login',
      user: hasUserSession ? UserSession.getUser() : this.emptyUser()
    }
  }

  emptyUser() {
    return {
      email: '',
      password: '',
      contacts: []
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
        console.error(error.response.data)
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
        console.error(error.response.data)
      }
    )
  }

  logoutLinkHandler = () => {
    UserSession.removeUser()
    this.setState({
      hasUserSession: false,
      user: this.emptyUser()
    })
  }

  createLinkHandler = () => {
    this.setState({currentPage: 'Create'})
  }

  loginLinkHandler = () => {
    this.setState({currentPage: 'Login'})
  }

  render() {
    return (
      <div>
        <Header>
          {this.renderHeaderButton()}
        </Header>

        <div className="container content">
          {this.renderBody()}
        </div>
      </div>
    )
  }

  renderHeaderButton() {
    let buttonAction, buttonText

    if (this.state.hasUserSession) {
      buttonAction = this.logoutLinkHandler
      buttonText = "Log Out"

    } else {
      if (this.state.currentPage === 'Create') {
        buttonAction = this.loginLinkHandler
        buttonText = "Sign In"

      } else {
        buttonAction = this.createLinkHandler
        buttonText = "Sign Up"
      }
    }

    return (
      <button onClick={buttonAction} className="btn btn-warning btn-sm">{buttonText}</button>
    )
  }

  renderBody() {
    if (this.state.hasUserSession) {
      return <ContactLayout contacts={this.state.user.contacts} />

    } else {
      return (
        <UserLayout
          loginHandler={this.loginHandler}
          createHandler={this.createHandler}
          currentPage={this.state.currentPage} />
      )
    }
  }
}
