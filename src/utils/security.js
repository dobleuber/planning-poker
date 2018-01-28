const UserID = 'user-id';
const AuthToken = 'auth-token';
const IsGuest = 'is-guest';

class Security {
  static get userId() {
    return localStorage.getItem(UserID);
  }

  static get authToken() {
    return localStorage.getItem(AuthToken);
  }

  static get isGuest() {
    return !!localStorage.getItem(IsGuest);
  }

  static setCredentials(id, token) {
    localStorage.setItem(UserID, id);
    localStorage.setItem(AuthToken, token);
  }

  static setGuest() {
    localStorage.setItem(IsGuest, true);
  }

  static removeGuest() {
    localStorage.removeItem(IsGuest);
  }

  static clearCredentials() {
    localStorage.clear();
  }
}

export default Security;
