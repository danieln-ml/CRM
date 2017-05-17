import React from "react"
import ContactInput from "../Inputs/Input.jsx"
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
    let contactFields = this.props.contact ? Object.keys(this.props.contact) : []
    let inputFields = contactFields
      .filter(field => field !== '_id')
      .map((field, index) => {
        return (
          <ContactInput key={index}
            name={field}
            label={DISPLAY_NAMES[field]}
            value={this.props.contact ? this.props.contact[field] : ''}
            placeholder={'some placeholder'}
            onInputChange={this.props.onChangeContact} />
        )
      })

    let { contact } = this.props
    return (
      <div className='editable-view'>
        {inputFields}
        <ContactButtonBar
          contact={contact}
          onCreateContact={this.props.onCreateContact}
          onUpdateContact={this.props.onUpdateContact}
          onDeleteContact={this.props.onDeleteContact} />
      </div>
    )
  }
}
