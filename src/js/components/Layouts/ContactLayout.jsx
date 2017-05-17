import React from "react"
import ContactApi from "../../services/ContactsApi.js"
import ContactList from "../Contacts/ContactList.jsx"
import ContactForm from "../Contacts/ContactForm.jsx"

const initContact = () => {
  return {
    firstName: "",
    lastName: "",
    email: "",
    phoneMobile: "",
    phoneWork: "",
    phoneHome: ""
  }
}

export default class ContactLayout extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedContact: initContact(),
      contacts: []
    }
    this.componentDidMount.bind(this)
  }

  componentDidMount() {
    ContactApi.fetchContacts().then( (res) => {
        let contacts = res.data.map(contact => {
          return {
            _id: contact._id,
            firstName: contact.firstName,
            lastName: contact.lastName,
            email: contact.email,
            phoneMobile: contact.phoneNumbers.mobile || '',
            phoneWork: contact.phoneNumbers.work || '',
            phoneHome: contact.phoneNumbers.home || '',
          }
        })
        this.setState({ contacts: contacts })
      },
      (error) => {
        console.error(error.message)
      }
    )
  }

  addStagedContact = () => {
    this.setState({
      selectedContact: initContact()
    })
  }

  handleSelectContact = (id) => {
    let selectedContact = this.state.contacts.find(c => c._id ===  id)
    this.setState({'selectedContact': Object.assign({}, selectedContact) })
  }

  handleChangeContact = (key, val) => {
    let { selectedContact, contacts } = this.state;
    selectedContact[key] = val

    if (selectedContact._id) {
      let cIndex = contacts.findIndex(c => selectedContact._id === c._id)
      if (cIndex !== -1) {
        contacts[cIndex] = selectedContact
      }
    }

    this.setState({
      "selectedContact": Object.assign({}, selectedContact),
      "contacts": contacts.slice()
    })
  }

  handleServerError = (error) => { alert(error) }

  handleCreateContact = (contact) => {
    ContactApi.createContact(contact).then(
      (response) => {
        let { _id } = response.data
        let newContact = Object.assign(contact, { _id: _id } )
        this.state.contacts.push(newContact)
        this.setState({
          selectedContact: initContact(),
          contacts: this.state.contacts.slice()
        })
      },
      this.handleServerError
    )
  }

  handleDeleteContact = (contactId) => {
    ContactApi.removeContact(contactId).then(
      (response) => {
        let cIndex = this.state.contacts.findIndex(c => c._id === contactId)
        this.state.contacts.splice(cIndex, 1)

        this.setState({
          selectedContact: initContact(),
          contacts: this.state.contacts.slice()
        })
      },
      this.handleServerError
    )
  }

  handleUpdateContact = (contactId) => {
    const cIndex = this.state.contacts.findIndex(c => c._id === contactId)
    const contact = Object.assign({}, this.state.selectedContact)
    this.state.contacts[cIndex] = contact

    ContactApi.updateContact(contact).then(
      (response) => {
        this.setState({
          selectedContact: initContact(),
          contacts: this.state.contacts.slice()
        })
      },
      this.handleServerError
    )
  }

  render() {
    const titleText = this.state.selectedContact._id ? "Edit Contact": "Create Contact"
    return (
      <div className="row">
        <div className="col-md-6">
          <ContactList
            contacts={this.state.contacts}
            selectedContact={this.state.selectedContact}
            handleSelectContact={this.handleSelectContact} />
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
    )
  }
}
