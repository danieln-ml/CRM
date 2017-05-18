import React from "react"
import Form from "../Base/Form.jsx"

export default class CreateContactForm extends React.Component {

  render() {
    const { submitHandler, children, className } = this.props
    return (
      <Form className={`contact-form ${className}`} onSubmit={submitHandler}>
        <div className="contact-form-top">
          <h3 className="contact-form-top--title">Create Contact</h3>
        </div>

        <div className='editable-view'>
          {children}
          <div className="button-bar">
            <button type="submit" className="btn btn-primary pull-right">Create Contact</button>
          </div>
        </div>
      </Form>
    )
  }
}
