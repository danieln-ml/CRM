import React from "react";

export default class ContactInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleInputChange.bind(this);
  }

  handleInputChange(key, value) {
    return (event) => {
      const target = event.target;
      const value = target.value;
      const key = target.name;
      this.props.onInputChange(key, value);
      console.log('changing from... name=>', name, 'valueis =>', value);
    };
  }

  render() {
    console.log('contact input', this.props);
    return (
      <div className="form-group">
        <label for={this.props.name}>{this.props.name}</label>
        <input type="text"
          placeholder={this.props.placeholder}
          name={this.props.name}
          id={this.props.name}
          value={this.props.value}
          onChange={this.handleInputChange(this.props.name, this.props.value)} />
      </div>
    );
  }
}
