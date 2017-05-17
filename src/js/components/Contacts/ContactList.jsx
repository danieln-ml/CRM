import React from "react"

export default class ContactList extends React.Component {

  render() {
    const contactList = this.props.contacts.map((contact) => {
      const { _id, firstName, lastName } = contact
      const selectedId = this.props.selectedContact._id
      const fullName = firstName + " " + lastName
      const clickHandler = (e) => this.props.handleSelectContact(_id)
      const selectedClass = selectedId && selectedId === _id ? "selected" : ""

      return <li key={_id} className={selectedClass} onClick={clickHandler}>{fullName}</li>
    })

    return <ul> {contactList} </ul>
  }
}
