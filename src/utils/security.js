const UserID = 'user-id';
const AuthToken = 'auth-token';
const UserName = 'user-name';

class Security {
  static get userId() {
    return localStorage.getItem(UserID);
  }

  static get authToken() {
    return localStorage.getItem(AuthToken);
  }

  static get userName() {
    return localStorage.getItem(UserName);
  }

  static setCredentials(id, token) {
    localStorage.setItem(UserID, id);
    localStorage.setItem(AuthToken, token);
  }

  static set userName(userName) {
    localStorage.setItem(UserName, userName);
  }

  static clearCredentials() {
    localStorage.clear();
  }
}

export default Security;
