import React from "react"

export default class EditContactForm extends React.Component {

  state = {
    editable: false
  }

  render() {
    const {submitHandler, deleteHandler} = this.props
    return (
      <form onSubmit={submitHandler}>
        <h3>Edit Contact</h3>
        {this.props.children}
        <div className="button-bar">
          <button type="submit" key="Save"  className="btn btn-primary">Save</button>
          <button key="Delete" className="btn btn-danger" onClick={deleteHandler}>Delete</button>
        </div>
      </form>
    )
  }
}
