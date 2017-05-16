import axios from "axios"
import UserSession from "./UserSession"

axios.defaults.headers.post['Content-Type'] = 'application/json';
// axios.defaults.baseURL = 'https://glacial-journey-40070.herokuapp.com';
axios.defaults.baseURL = 'http://127.0.0.1:9900';
// axios.defaults.baseURL = 'http://10.78.177.51:9900';

function toSchema(contact) {
  var body = {
    firstName: contact.firstName,
    lastName: contact.lastName,
    email: contact.email,
    phoneNumbers: {
      mobile: contact.phoneMobile,
      work: contact.phoneWork,
      home: contact.phoneHome
    }
  };
  if (contact._id) {
    body._id = contact._id;
  }
  return body;
}

function getAuthObject(user) {
  return { username: user.email, password: user.password };
}

var Api = {
  createUser: (user) => {
    return axios({
      method: 'post',
      url: '/users',
      data: {
        email: user.email,
        password: user.password
      }
    });
  },

  authenticateUser: (user) => {
    return axios({
      method: 'get',
      url: '/me',
      auth: getAuthObject(user)
    });
  },

  fetchContacts: () => {
    var user = UserSession.getUser();
    return axios({
      method: 'get',
      url: `/users/${user._id}/contacts`,
      auth: getAuthObject(user)
    });
  },

  createContact: (contact) => {
    var user = UserSession.getUser();
    return axios({
      method: 'post',
      url: `/users/${user._id}/contacts`,
      auth: getAuthObject(user),
      data: toSchema(contact)
    });
  },

  removeContact: (contactId) => {
    var user = UserSession.getUser();
    return axios({
      method: 'delete',
      url: `/users/${user._id}/contacts/${contactId}`,
      auth: getAuthObject(user)
    });
  },

  updateContact: (contact) => {
    var user = UserSession.getUser();
    return axios({
      method: 'put',
      url: `/users/${user._id}/contacts/${contact._id}`,
      auth: getAuthObject(user),
      data: toSchema(contact)
    });
  }
};

export { Api as default }
