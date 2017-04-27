import React from "react";
import ContactItem from "./ContactItem.jsx";

export default class ContactList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedId: null
    }
    this.wrapSelectHandler.bind(this);
  }

  wrapSelectHandler(id, selectHandler) {
    var self = this;
    return (e) => {
      self.setState({ "selectedId": id});
      selectHandler(id);
    };
  }

  render() {
    var contactList = this.props.contacts.map((contact) => {
      var cId = contact._id.$oid;
      var clickHandler = this.wrapSelectHandler(cId, this.props.handleSelectContact);
      var isSelected = this.state.selectedId && contact._id.$oid === this.state.selectedId;
      return (
        <li key={cId} className={isSelected ? "selected" : ""} onClick={clickHandler}> {contact.name}</li>
      );
    });
    return <ul>{contactList}</ul>;
  }
}
