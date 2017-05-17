import React from "react"

export default class FormInput extends React.Component {

  handleInputChange = (key, value) => {
    return (event) => {
      const target = event.target
      const value = target.value
      const key = target.name
      this.props.onInputChange(key, value)
    }
  }

  render() {
    return (
      <div className="form-group">
        <label className="form-label" for={this.props.name}>{this.props.label}</label>
        <div>
          <input type="text"
            className="form-control"
            placeholder={this.props.placeholder}
            name={this.props.name}
            id={this.props.name}
            value={this.props.value}
            onChange={this.handleInputChange(this.props.name, this.props.value)} />
          </div>
      </div>
    )
  }
}
