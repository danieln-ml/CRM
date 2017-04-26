import React from "react";
import ContactItem from "./ContactItem.jsx";

export default class ContactList extends React.Component {

  render() {
    var clickHandler = (id, selectHandler) => {
      return () => { selectHandler(id) };
    };
    var contactList = this.props.contacts.map((contact) => {
      return (
        <li key={contact._id.$oid}
          onClick={clickHandler(contact._id, this.props.handleSelectContact)}>
          {contact.name}</li>
      );
    });
    return <ul>{contactList}</ul>;
  }
}
