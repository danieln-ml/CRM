var USER_KEY = "mLabUser"

var UserSession = {
  setUser: function(user) {
    return sessionStorage.setItem(USER_KEY, JSON.stringify(user))
  },
  getUser: function() {
    return JSON.parse(sessionStorage.getItem(USER_KEY))
  },
  removeUser: function() {
    return sessionStorage.removeItem(USER_KEY)
  }
}
window.UserSession = UserSession
export default UserSession
