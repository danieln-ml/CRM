import React from "react";
import ContactItem from "./ContactItem.jsx";

export default class ContactList extends React.Component {

  wrapSelectHandler(id, selectHandler) {
    return (e) => {
      selectHandler(id);
    };
  }

  render() {
    var contactList = this.props.contacts.map((contact) => {
      var cId = contact._id;
      var fullName = contact.firstName + " " + contact.lastName;
      var clickHandler = this.wrapSelectHandler(cId, this.props.handleSelectContact);
      var selectedContact = this.props.selectedContact;
      var isSelected = selectedContact._id && selectedContact._id === cId;
      return (
        <li key={cId} className={isSelected ? "selected" : ""} onClick={clickHandler}> {fullName}</li>
      );
    });
    return <ul>{contactList}</ul>;
  }
}
