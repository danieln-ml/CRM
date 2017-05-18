import React from "react"
import Input from "../Inputs/Input.jsx"
import Form from "../Base/Form.jsx"

export default class Create extends React.Component {

  render() {
    const {onCreate, children} = this.props

    return (
      <section className="col-md-6 col-md-offset-3">
        <h3>Sign Up</h3>
        <Form onSubmit={onCreate}>
          {children}
          <input type="submit" className="btn btn-primary pull-right" value="Create Account" />
        </Form>
      </section>
    )
  }
}
