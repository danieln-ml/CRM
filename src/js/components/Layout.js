import React from "react";
import ContactApi from "../services/ContactService.js";
import ContactList from "./contactList/ContactList.jsx";
import ContactForm from "./contactForm/ContactForm.jsx";

var initContact = () => {
  return Object.assign({}, {
    name:     '',
    zipcode:  ''
  });
}

export default class Layout extends React.Component {
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
        var contacts = res.data;
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
    console.log('bowsing a create')
  }

  handleDeleteContact = (contactId) => {
    console.log('bowsing a deletes')
  }

  handleUpdateContact = (contactId) => {
    console.log('bowsing a update')
  }

  render() {
    return (
      <div class="main">
        <div class="column">
          <ContactList contacts={this.state.contacts} handleSelectContact={this.handleSelectContact} />
          <button onClick={this.addStagedContact}>Add Contact</button>
        </div>
        <div class="column">
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
