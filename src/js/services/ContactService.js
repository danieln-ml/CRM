import axios from "axios"
import UserSession from "./UserSession"

axios.defaults.headers.post['Content-Type'] = 'application/json';
// {
//   "_id": "590236c5a23f95606c184c53",
//   "phoneNumbers": {
//     "mobile": "415-555-5555"
//   },
//   "firstName": "Mary",
//   "lastName": "Smith",
//   "email": "mary@smith.com"
// }

function transformToPost(contact) {
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

var Api = {
  authenticateUser: (user) => {
    return axios({
      method: 'post',
      url: '/api/login',
      auth: {
        username: user.email,
        password: user.password
      }
    });
  },

  createUser: (user) => {
    return axios({
      method: 'post',
      url: '/api/users/',
      data: {
        email: user.email,
        password: user.password
      }
    });
  },

  // users/:id/contacts/* Methods
  fetchAll: () => {
    var user = UserSession.getUser();
    return axios({
      method: 'get',
      url: `/api/users/${user._id}/contacts`,
      auth: {
        username: user.email,
        password: user.password
      }
    });
  },
  createContact: (contact) => {
    var user = UserSession.getUser();
    return axios({
      method: 'post',
      url: `/api/users/${user._id}/contacts`,
      auth: {
        username: user.email,
        password: user.password
      },
      data: transformToPost(contact)
    });
  },
  removeContact: (contactId) => {
    var user = UserSession.getUser();
    return axios({
      method: 'delete',
      url: `/api/users/${user._id}/contacts/${contactId}`,
      auth: {
        username: user.email,
        password: user.password
      }
    });
  },
  updateContact: (contact) => {
    var user = UserSession.getUser();
    return axios({
      method: 'put',
      url: `/api/users/${user._id}/contacts/${contact._id}`,
      auth: {
        username: user.email,
        password: user.password
      },
      data: transformToPost(contact)
    });
  }
};

export { Api as default }
