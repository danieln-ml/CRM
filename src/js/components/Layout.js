import React from "react";
import ContactApi from "../services/ContactService.js";
import ContactList from "./contactList/ContactList.jsx";
import ContactForm from "./contactForm/ContactForm.jsx";

export default class Layout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedContact: null,
      contacts: []
    };
    this.componentDidMount.bind(this);
  }

  componentDidMount() {
    var self = this;
    ContactApi.fetchAll().then(function(res) {
      const contacts = res.data;
      self.setState({ contacts: contacts });
    });
  }

  addStagedContact = () => {
    this.setState({
      'selectedContact': Object.assign({}, {
        name:     '',
        zipcode:  ''
      })
    });
  }

  handleSelectContact = (id) => {
    var selectedContact = this.state.contacts.find((contact) => {
      return contact._id.$oid ===  id.$oid;
    });
    this.setState({'selectedContact': Object.assign({}, selectedContact) });
    console.log(this.state.selectedContact);
  }
  //
  // handleUpdateContact = (key, val) => {
  //   var copyContact = Object.assign({}, this.state.selectedContact);
  //   copyContact[key] = val;
  //   var copyContacts = this.state.contacts.slice();
  //
  //   if (copyContact._id) {
  //     var indexOfElem = -1;
  //     this.state.contacts.find((contact, index) => {
  //       if (contact._id.$oid === this.state.selectedContact._id.$oid) {
  //         indexOfElem = index;
  //       }
  //     });
  //     if (indexOfElem !== -1) {
  //       copyContacts[indexOfElem] = copyContact;
  //     }
  //   }
  //
  //   this.setState({
  //     "selectedContact": copyContact,
  //     "contacts": copyContacts
  //   });
  // }

  handleCreateContact = (contact) => {
    console.log('bowsing a create')
    // ContactApi.create(contact)
    //   .then(function(data) {
    //     console.log(data);
    //   })
  }
  handleDeleteContact = (contactId) => {
    console.log('bowsing a deletes')
    // ContactApi.create(contact)
    //   .then(function(data) {
    //     console.log(data);
    //   })
  }
  handleUpdateContact = (contactId) => {
    console.log('bowsing a updsate')
    // ContactApi.create(contact)
    //   .then(function(data) {
    //     console.log(data);
    //   })
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
            onCreateContact={this.handleCreateContact}
            onUpdateContact={this.handleUpdateContact}
            onDeleteContact={this.handleDeleteContact} />
        </div>
      </div>
    );
  }
}
