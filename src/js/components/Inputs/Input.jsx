import React from "react"

export default class FormInput extends React.Component {

  handleInputChange = (e) => {
    const {value} = e.target
    const { name } = this.props
    this.props.handleChange(name, value)
  }

  render() {
    const  { name, value, placeholder, label, type } = this.props
    return (
      <div className="form-group">
        <label className="form-label" for={name}>{label}</label>
        <input
          className="form-control"
          placeholder={placeholder}
          name={name}
          id={name}
          value={value}
          type={type}
          onChange={this.handleInputChange} />
      </div>
    )
  }
}
