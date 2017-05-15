import React from "react";
import ContactApi from "../services/ContactService.js";
import ContactList from "./contactList/ContactList.jsx";
import ContactForm from "./contactForm/ContactForm.jsx";

var initContact = () => {
  return {
    firstName: "",
    lastName: "",
    email: "",
    phoneMobile: "",
    phoneWork: "",
    phoneHome: ""
  };
}

export default class ContactLayout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedContact: initContact(),
      contacts: []
    };
    this.componentDidMount.bind(this);
  }

  componentDidMount() {
    var self = this;
    ContactApi.fetchAll().then(
      function(res) {
        var contacts = res.data.map(contact => {
          return {
            _id: contact._id,
            firstName: contact.firstName,
            lastName: contact.lastName,
            email: contact.email,
            phoneMobile: contact.phoneNumbers.mobile || '',
            phoneWork: contact.phoneNumbers.work || '',
            phoneHome: contact.phoneNumbers.home || '',
          };
        });
        self.setState({ contacts: contacts });
      },
      function(error) {
        console.error(error.message);
      }
    );
  }

  addStagedContact = () => {
    this.setState({
      'selectedContact': initContact()
    });
  }

  handleSelectContact = (id) => {
    var selectedContact = this.state.contacts.find((contact) => {
      return contact._id ===  id;
    });
    this.setState({'selectedContact': Object.assign({}, selectedContact) });
    console.log(this.state.selectedContact);
  }

  handleChangeContact = (key, val) => {
    var copyContact = Object.assign({}, this.state.selectedContact);
    copyContact[key] = val;
    var copyContacts = this.state.contacts.slice();

    if (copyContact._id) {
      var indexOfElem = -1;
      this.state.contacts.find((contact, index) => {
        if (contact._id.$oid === this.state.selectedContact._id.$oid) {
          indexOfElem = index;
        }
      });
      if (indexOfElem !== -1) {
        copyContacts[indexOfElem] = copyContact;
      }
    }

    this.setState({
      "selectedContact": copyContact,
      "contacts": copyContacts
    });
  }

  handleCreateContact = (contact) => {
    var self = this;
    ContactApi.createContact(contact).then( (response) => {
        var params = response.headers.location.split('/');
        var contactId = params[params.length - 1];
        var newContact = Object.assign(contact, { _id: contactId } );
        self.state.contacts.push(newContact);
        self.setState({
          selectedContact: initContact(),
          contacts: self.state.contacts.slice()
        })
      },
      function(err) {
        alert(err);
      }
    );
  }

  handleDeleteContact = (contactId) => {
    console.log('bowsing a deletes')
  }

  handleUpdateContact = (contactId) => {
    console.log('bowsing a update')
  }

  render() {
    return (
      <div className="row">
        <div className="col-md-6">
          <ContactList contacts={this.state.contacts} handleSelectContact={this.handleSelectContact} />
          <button onClick={this.addStagedContact}>Add Contact</button>
        </div>
        <div className="col-md-6">
          <h4>Add Contact</h4>
          <ContactForm
            contact={this.state.selectedContact}
            onChangeContact={this.handleChangeContact}
            onCreateContact={this.handleCreateContact}
            onUpdateContact={this.handleUpdateContact}
            onDeleteContact={this.handleDeleteContact} />
        </div>
      </div>
    );
  }
}
