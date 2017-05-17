import React from "react"
import Input from "../Inputs/Input.jsx"

export default class UserLayout extends React.Component {

  render() {
    const {user, loginHandler, handleChange} = this.props
    return (
      <div>
        <h3>Log In</h3>
        <form>
          <Input
            label="Email"
            handleChange={handleChange}
            value={user.email}
            name="email"
            placeholder="some email" />

          <Input
            label="Password"
            handleChange={handleChange}
            value={user.password}
            name="password"
            placeholder="some password" />

            <a className="btn btn-default" onClick={() => loginHandler(user)}>Login</a>
        </form>
      </div>
    )
  }
}
