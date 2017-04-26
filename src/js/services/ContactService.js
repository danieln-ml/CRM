import axios from "axios";

var Api = {
  fetchAll: () => {
    return axios.get('/api/contacts');
  },
  create: (contact) => {
    return axios.post('/api/contacts', contact);
  },
  delete: (id) => {
    return axios.delete('/api/contacts/' + id);
  },
  update: (contact) => {
    return axios.put(`/api/contacts/${contact._id }`, contact);
  },

};

export { Api as default }
