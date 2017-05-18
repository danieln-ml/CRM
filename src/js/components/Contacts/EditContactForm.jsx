import React from "react"
import Form from "../Base/Form.jsx"

export default class EditContactForm extends React.Component {

  render() {
    const {submitHandler, deleteHandler, className, children} = this.props
    return (
      <Form className={`contact-form ${className}`} onSubmit={submitHandler}>
        <div className="contact-form-top">
          <h3 className="contact-form-top--title">Edit Contact</h3>
        </div>

        {children}

        <div className="button-bar">
          <button type="submit" key="Save"  className="btn btn-primary pull-right">Save Changes</button>
          <button key="Delete" className="btn btn-danger pull-left" onClick={deleteHandler}>Delete</button>
        </div>
      </Form>
    )
  }
}
