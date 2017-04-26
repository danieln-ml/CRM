import React from "react";
import ContactInput from "./ContactInput.jsx";
import ContactButtonBar from "./ContactButtonBar.jsx";
export default class ContactForm extends React.Component {

  constructor(props) {
    super(props);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log('nextProps', nextProps);
    return true;
  }

  handleInputChange(event) {

    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.props.handleUpdateContact(name, value);
    console.log('changing from... name=>', name, 'valueis =>', value);
  }

  render() {
    var contactFields = this.props.contact ? Object.keys(this.props.contact) : [];
    var fieldComps = contactFields.map((field, index) => {
      return (
        <div className="form-group" key={index}>
          <label for={field}> {field}</label>
          <input type="text"
            id={field}
            name={field}
            value={this.props.contact ? this.props.contact[field] : ''}
            onChange={this.handleInputChange} />
        </div>
      );
    });

    var contact = this.props.contact;
    return (
      <div className='editable-view'>
        {fieldComps}
        <ContactButtonBar
          contact={contact}
          onCreateContact={this.props.onCreateContact}
          onUpdateContact={this.props.onUpdateContact}
          onDeleteContact={this.props.onDeleteContact} />
      </div>
    );
  }
}
