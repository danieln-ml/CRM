import React from "react"
import Input from "../Inputs/Input.jsx"

export default class UserLayout extends React.Component {


  render() {
    const {user, loginHandler, handleChange} = this.props

    const handleSubmit = (e) => {
      loginHandler(user)
      e.preventDefault()
    }

    return (
      <div>
        <h3>Log In</h3>
        <form onSubmit={handleSubmit}>
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

          <input type="submit" value="Login" />
        </form>
      </div>
    )
  }
}
