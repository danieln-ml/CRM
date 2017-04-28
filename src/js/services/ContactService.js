import axios from "axios"
import UserSession from "./UserSession"

axios.defaults.headers.post['Content-Type'] = 'application/json';

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
  create: (contact) => {
    return axios.post('/api/contacts', contact);
  },
  delete: (id) => {
    return axios.delete('/api/contacts/' + id);
  },
  update: (contact) => {
    return axios.put(`/api/contacts/${contact._id }`, contact);
  }
};

export { Api as default }
