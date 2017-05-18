import React from "react"

export default class Header extends React.Component {

  render() {
    return (
      <header className="header">
        <div className="container header--content">
          <h2 className="header--title">Contact List</h2>

          <div className="header--links">
            <button onClick={this.props.buttonAction} className="btn btn-warning btn-sm">{this.props.buttonText}</button>
          </div>
        </div>
      </header>
    )
  }
}
