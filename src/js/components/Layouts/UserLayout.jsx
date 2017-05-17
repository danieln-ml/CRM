import React from "react"
import Create from "./Create.jsx"
import Login from "./Login.jsx"

export default class UserLayout extends React.Component {

  state = {
    user: {
      email: '',
      password: ''
    }
  }

  handleChange = (name, value) => {
     let user = Object.assign({}, this.state.user)
     user[name] = value
     this.setState({ user: user })
   }


  render() {
    const {user} = this.state
    const {onCreate, createHandler, loginHandler} = this.props
    return (
      onCreate ?
        <Create createHandler={createHandler} user={user} handleChange={this.handleChange}/> :
        <Login loginHandler={loginHandler} user={user} handleChange={this.handleChange}/>
    )
  }
}
