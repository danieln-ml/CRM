import React from "react"

export default class EditContactForm extends React.Component {

  state = {
    editable: false
  }

  render() {
    const {submitHandler, deleteHandler, className} = this.props
    return (
      <form className={`contact-form ${className}`} onSubmit={submitHandler}>
        <div className="contact-form-top">
          <h3 className="contact-form-top--title">Edit Contact</h3>
        </div>
        
        {this.props.children}

        <div className="button-bar">
          <button type="submit" key="Save"  className="btn btn-primary">Save</button>
          <button key="Delete" className="btn btn-danger" onClick={deleteHandler}>Delete</button>
        </div>
      </form>
    )
  }
}
