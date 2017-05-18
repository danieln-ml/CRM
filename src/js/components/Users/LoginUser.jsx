import React from "react"
import Form from "../Base/Form.jsx"

export default class Login extends React.Component {

  render() {
    const {onLogin, children} = this.props

    return (
      <section className="col-md-6 col-md-offset-3">
        <h3>Sign In</h3>
        <Form onSubmit={onLogin}>
          {children}
          <input type="submit" className="btn btn-primary pull-right" value="Sign In" />
        </Form>
      </section>
    )
  }
}
