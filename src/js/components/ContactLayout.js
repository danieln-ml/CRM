import React from "react";
import ContactApi from "../services/ContactsApi.js";
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
    ContactApi.fetchContacts().then( (res) => {
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
      (error) => {
        console.error(error.message);
      }
    );
  }

  addStagedContact = () => {
    this.setState({
      selectedContact: initContact()
    });
  }

  handleSelectContact = (id) => {
    var selectedContact = this.state.contacts.find((contact) => {
      return contact._id ===  id;
    });
    this.setState({'selectedContact': Object.assign({}, selectedContact) });
  }

  handleChangeContact = (key, val) => {
    var selectedContact = this.state.selectedContact;
    var contacts = this.state.contacts;
    selectedContact[key] = val;

    if (selectedContact._id) {
      var cIndex = contacts.findIndex((currContact) => {
        return selectedContact._id === currContact._id;
      });

      if (cIndex !== -1) {
        contacts[cIndex] = selectedContact;
      }
    }

    this.setState({
      "selectedContact": Object.assign({}, selectedContact),
      "contacts": contacts.slice()
    });
  }

  handleCreateContact = (contact) => {
    ContactApi.createContact(contact).then( (response) => {
        var contactId = response.data._id;
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
    var self = this;
    ContactApi.removeContact(contactId)
      .then( (response) => {
        var cIndex = self.state.contacts.findIndex((cont) => {
          return cont._id === contactId;
        });
        self.state.contacts.splice(cIndex, 1);

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

  handleUpdateContact = (contactId) => {
    var self = this;
    var cIndex = self.state.contacts.findIndex((cont) => {
      return cont._id === contactId;
    });
    var contact = Object.assign({}, self.state.selectedContact);
    self.state.contacts[cIndex] = contact;

    ContactApi.updateContact(contact)
      .then( (response) => {
        console.log('update successful');
        self.setState({
          selectedContact: initContact(),
          contacts: self.state.contacts.slice()
        })
      },
      (err) => {
        alert(err);
      }
    );
  }

  render() {
    var titleText = this.state.selectedContact._id ? "Edit Contact": "Create Contact";
    return (
      <div className="row">
        <div className="col-md-6">
          <ContactList contacts={this.state.contacts} selectedContact={this.state.selectedContact} handleSelectContact={this.handleSelectContact} />
          <button onClick={this.addStagedContact}>Add Contact</button>
        </div>
        <div className="col-md-6">
          <h4>{titleText}</h4>
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
