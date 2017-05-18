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
      <section className="col-md-6 col-md-offset-3">
        <h3>Sign In</h3>
        <form onSubmit={handleSubmit}>
          <Input
            label="Email"
            type="email"
            handleChange={handleChange}
            value={user.email}
            name="email"
            placeholder="admin@carbon.io" />

          <Input
            label="Password"
            type="password"
            handleChange={handleChange}
            value={user.password}
            name="password"
            placeholder="Password" />

          <input type="submit" value="Sign In" className="btn btn-primary pull-right" />
        </form>
      </section>
    )
  }
}
