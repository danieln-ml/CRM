import React from "react"

export default class ContactList extends React.Component {

  render() {
    return (
      <section className={`contact-list ${this.props.className}`}>
        <div className="contact-list-top">
          <h3 className="contact-list-top--title">Contacts</h3>
          { this.props.selectedContact._id &&
            <button className="btn btn-primary btn-sm" onClick={this.props.addContactAction}>+ Add Contact</button>
          }
        </div>

        <ul className="contact-list--list">
          { this.props.contacts.length ?
            this.props.contacts.map((contact) => this.renderListItem(contact))
            :
            <li className="contact-list--list-item m-empty">You haven't added any contacts, yet.</li>
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
        className={`contact-list--list-item ${selectedClass}`}
        onClick={(e) => this.props.handleSelectContact(_id)}>
        {`${firstName} ${lastName}`}
      </li>
    )
  }
}
