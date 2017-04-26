import React from "react";

export default class ContactButtonBar extends React.Component {

  wrapIdHandler(contactId, fn) {
    return (e) => { fn(contactId) }
  }

  wrapCreateHandler(contact, fn) {
    return (e) => { fn(contact) }
  }

  render() {
    var contact = this.props.contact;
    var cId = contact && contact._id;
    if (cId) {
      return (
        <div class="button-bar">
          <button onClick={this.wrapIdHandler(cId, this.props.onUpdateContact)}>Update</button>
          <button onClick={this.wrapIdHandler(cId, this.props.onDeleteContact)}>Delete</button>
        </div>
      );
    }
    else {
      return (
        <div class="button-bar">
          <button onClick={this.wrapCreateHandler(contact, this.props.onCreateContact)}>Create</button>
        </div>
      );
    }
  }
}
