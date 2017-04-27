import React from "react";

export default class ContactItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = { selected: false };
  }

  handleItemClick(e) {
    this.props.onSelectContact(this.props.key);
  }

  render() {
    return (
      <li className={ this.state.selected ? 'selected' : ''}
        onClick={this.handleItemClick} >
        {this.props.value}</li>
    );
  }
}
