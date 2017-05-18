import React from "react"

export default class Header extends React.Component {

  render() {
    return (
      <header className="header">
        <div className="container header--content">
          <h2 className="header--title">Contact List</h2>

          <div className="header--links">
            <a onClick={this.props.buttonAction}>{this.props.buttonText}</a>
          </div>
        </div>
      </header>
    )
  }
}
