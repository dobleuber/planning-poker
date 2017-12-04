import { userInfo } from "os";

const UserID = 'user-id';
const AuthToken = 'auth-token';
const UserName = 'user-name';

class Security {
  static getIserId() {
    return localStorage.getItem(UserID);
  }

  static getAuthToken() {
    return localStorage.getItem(AuthToken);
  }

  static getIserName() {
    return localStorage.getItem(UserName);
  }

  static setCredentials(id, token) {
    localStorage.setItem(UserID, id);
    localStorage.setItem(AuthToken, token);
  }

  static setUserName(userName) {
    localStorage.setItem(UserName, userName);
  }

  static clearCredentials() {
    localStorage.clear();
  }
}

export default Security;
