import React from "react"
import Input from "../Inputs/Input.jsx"
import UserSession from "../../services/UserSession"

export default class UserLayout extends React.Component {

  state = {
    user: {
      email: '',
      password: ''
    }
  }

 handleChange = (name, value) => {
    let user = Object.assign({}, this.state.user)
    user[name] = value
    this.setState({ user: user })
  }

  render() {
    const {user} = this.state
    const {onCreate, createHandler, loginHandler} = this.props
    return (
      <div>
        <h3> {onCreate ? 'Create Account' : 'Sign In'} </h3>
        <form>
          <Input
            label="Email"
            handleChange={this.handleChange}
            value={user.email}
            name="email"
            placeholder="some email" />

          <Input
            label="Password"
            handleChange={this.handleChange}
            value={user.password}
            name="password"
            placeholder="some password" />

          {onCreate ?
            <a className="btn btn-default" onClick={() => createHandler(user)}>Create</a> :
            <a className="btn btn-primary" onClick={() => loginHandler(user)}>Login</a>
          }
        </form>
      </div>
    )
  }
}
