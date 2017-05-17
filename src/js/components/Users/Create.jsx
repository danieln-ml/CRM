import React from "react"
import Input from "../Inputs/Input.jsx"

export default class UserLayout extends React.Component {



  render() {
    const {user, createHandler, handleChange} = this.props

    const handleSubmit = (e) => {
      createHandler(user)
      e.preventDefault()
    }

    return (
      <div>
        <h3>Create Account</h3>
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

            <input type="submit" value="Create" />
        </form>
      </div>
    )
  }
}
