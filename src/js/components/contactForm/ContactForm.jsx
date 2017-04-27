import React from "react";
import ContactInput from "./ContactInput.jsx";
import ContactButtonBar from "./ContactButtonBar.jsx";

export default class ContactForm extends React.Component {

  render() {
    var contactFields = this.props.contact ? Object.keys(this.props.contact) : [];
    var inputFields = contactFields
      .filter((field) => field !== '_id')
      .map((field, index) => {
        return (
          <ContactInput key={index}
            name={field}
            value={this.props.contact ? this.props.contact[field] : ''}
            placeholder={'some placeholder'}
            onInputChange={this.props.onChangeContact} />
        );
      });

    var contact = this.props.contact;
    return (
      <div className='editable-view'>
        {inputFields}
        <ContactButtonBar
          contact={contact}
          onCreateContact={this.props.onCreateContact}
          onUpdateContact={this.props.onUpdateContact}
          onDeleteContact={this.props.onDeleteContact} />
      </div>
    );
  }
}
