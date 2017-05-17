import React from "react"

export default class ContactButtonBar extends React.Component {

  render() {
    const {contact} = this.props
    const cId = contact && contact._id
    let buttons;
    if (cId) {
      buttons = [
        <button key="Delete" onClick={(e) => this.props.onDeleteContact(cId)}>Delete</button>,
        <button key="Save" onClick={(e) => this.props.onUpdateContact(cId)}>Save</button>
      ]
    }
    else {
      buttons = <button onClick={(e) => this.props.onCreateContact(contact)}>Create</button>
    }
    return <div className="button-bar"> {buttons} </div>
  }
}
