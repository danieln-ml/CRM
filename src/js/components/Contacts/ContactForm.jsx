import React from "react"
import Input from "../Inputs/Input.jsx"
import ContactButtonBar from "./ContactButtonBar.jsx"

const DISPLAY_NAMES = {
  'firstName': 'First Name',
  'lastName': 'Last Name',
  'email': 'Email',
  'phoneMobile': 'Mobile',
  'phoneWork': 'Work',
  'phoneHome': 'Home'
}

export default class ContactForm extends React.Component {

  render() {
    const { contact, title, className, onCreateContact, onUpdateContact, onDeleteContact } = this.props
    const contactFields = contact ? Object.keys(contact) : []

    return (
      <section className={className}>
        <h3>{title}</h3>
        <div className='editable-view'>

          {contactFields
            .filter(field => field !== '_id')
            .map((field, index) => this.renderInput(field, index))
          }

          <ContactButtonBar
            contact={contact}
            onCreateContact={onCreateContact}
            onUpdateContact={onUpdateContact}
            onDeleteContact={onDeleteContact} />
        </div>
      </section>
    )
  }

  renderInput(field, index) {
    return (
      <Input
        key={index}
        name={field}
        label={DISPLAY_NAMES[field]}
        value={this.props.contact ? this.props.contact[field] : ''}
        placeholder={DISPLAY_NAMES[field]}
        handleChange={this.props.onChangeContact} />
    )
  }
}
