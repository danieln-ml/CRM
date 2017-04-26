import React from "react";

export default class ContactInput extends React.Component {

  render() {
    console.log('contact input', this.props);
    return (
      <div className="form-group">
        <label for={this.props.name}>{this.props.name}</label>
        <input type="text" id={this.props.name}
          value={this.props.value}
          onChange={this.props.inputChangeHandler} />
      </div>
    );
  }
}
