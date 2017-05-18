import React from "react"

export default class CreateContactForm extends React.Component {

  render() {
    const { submitHandler, children, className } = this.props
    return (
      <form className={`contact-form ${className}`} onSubmit={submitHandler}>
        <div className="contact-form-top">
          <h3 className="contact-form-top--title">Create Contact</h3>
        </div>
        
        <div className='editable-view'>
          {children}
          <div className="button-bar">
            <button type="submit">Create</button>
          </div>
        </div>
      </form>
    )
  }
}
