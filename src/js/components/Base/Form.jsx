import React from "react"

export default class Form extends React.Component {

  wrapSubmission(submitHandler) {
    return (e) => {
      submitHandler(e)
      e.preventDefault()
    }
  }
  render() {
    const {className, children, onSubmit} = this.props
    return (
      <form onSubmit={this.wrapSubmission(onSubmit)} class={className}>
        {children}
      </form>
    )
  }

}
