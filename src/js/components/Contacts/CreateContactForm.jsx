import React from "react"

export default class CreateContactForm extends React.Component {

  render() {
    const { submitHandler, children } = this.props
    return (
      <form onSubmit={submitHandler}>
        <h3>Create Contact</h3>
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
