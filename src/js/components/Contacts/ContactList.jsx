import React from "react"

export default class ContactList extends React.Component {

  render() {
    return (
      <section className={this.props.className}>
        <h3>Contacts</h3>
        { this.props.selectedContact._id &&
          <button onClick={this.props.addContactAction}>Add Contact</button>
        }

        <ul className="contact-list">
          { this.props.contacts.length ?
            this.props.contacts.map((contact) => this.renderListItem(contact))
            :
            <li className="contact-list--item m-empty">You haven't added any contacts, yet.</li>
          }
        </ul>
      </section>
    )
  }

  renderListItem(contact) {
    const { _id, firstName, lastName } = contact
    const selectedId = this.props.selectedContact._id
    const selectedClass = selectedId && selectedId === _id ? "s-selected" : ""

    return (
      <li
        key={_id}
        className={`contact-list--item ${selectedClass}`}
        onClick={(e) => this.props.handleSelectContact(_id)}>
        {`${firstName} ${lastName}`}
      </li>
    )
  }
}
