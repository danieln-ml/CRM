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
      data: contact
    });
  },
  delete: (id) => {
    return axios.delete('/api/contacts/' + id);
  },
  update: (contact) => {
    return axios.put(`/api/contacts/${contact._id }`, contact);
  }
};

export { Api as default }
