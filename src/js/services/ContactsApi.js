import axios from "axios"
import UserSession from "./UserSession"

axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.baseURL = 'https://radiant-tor-79648.herokuapp.com';

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
      url: '/users/',
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
