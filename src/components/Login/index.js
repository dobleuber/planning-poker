import React, { Component } from 'react';
import { I18n } from 'react-i18next';
import queryString from 'query-string';

import './Login.css';

import {
  AuthenticateUserMutation,
  CreateGuestUserMutation,
  CreateUserMutation,
} from '../../mutations';

import Security from '../../utils/security';

const LoginType = {
  Guest: 1,
  Login: 2,
  Signup: 4,
};

class Login extends Component {
  static saveUserData(id, token) {
    localStorage.setItem('USER_ID', id);
    localStorage.setItem('USER_Token', token);
  }

  constructor() {
    super();
    this.state = {
      loginType: LoginType.Guest,
      email: '',
      password: '',
      username: '',
      message: '',
      loading: false,
    };

    this.handleValueChange = this.handleValueChange.bind(this);
    this.submitForm = this.submitForm.bind(this);
    this.doLogin = this.doLogin.bind(this);
  }

  handleValueChange(event) {
    const { target } = event;
    const { name, value } = target;

    this.setState({
      [name]: value,
    });
  }

  doLogin(err, id, token) {
    const parsedQueryString = queryString.parse(this.props.location.search);
    const redirect = parsedQueryString.redirect || '/';
    if (err) {
      this.setState({
        message: err[0].functionError,
        loading: false,
      });
    } else {
      Security.setCredentials(id, token);
      this.props.onLogin();
      this.props.history.push(redirect);
    }
  }

  submitForm(event) {
    event.preventDefault();
    this.setState({
      message: '',
      loading: true,
    });
    const parsedQueryString = queryString.parse(this.props.location.search);
    const { username, email, password } = this.state;
    const redirect = parsedQueryString.redirect || '/';
    switch (this.state.loginType) {
      case LoginType.Guest:
        if (username) {
          CreateGuestUserMutation(username, 'temporal', this.doLogin);
        }
        break;
      case LoginType.Login:
        if (email && password) {
          AuthenticateUserMutation(email, password, (err, id, token) => {
            if (err) {
              this.setState({
                message: err[0].functionError,
                loading: false,
              });
            } else {
              Security.setCredentials(id, token);
              this.props.onLogin();
              this.props.history.push(redirect);
            }
          });
        }
        break;
      case LoginType.Signup:
        if (email && password && username) {
          CreateUserMutation(email, password, username, this.doLogin);
        }
        break;
      default:
        break;
    }
  }

  render() {
    const { loginType, message, loading } = this.state;
    let title;
    let primaryButtonText;
    let secondaryButtonText;
    let nextState;
    switch (loginType) {
      case LoginType.Guest:
        title = 'ask-name';
        primaryButtonText = 'continue';
        secondaryButtonText = 'already-user';
        nextState = LoginType.Login;
        break;
      case LoginType.Login:
        title = 'login';
        primaryButtonText = 'login';
        secondaryButtonText = 'need-account';
        nextState = LoginType.Signup;
        break;
      case LoginType.Signup:
        title = 'sign-up';
        primaryButtonText = 'create-account';
        secondaryButtonText = 'already-user';
        nextState = LoginType.Login;
        break;
      default:
        break;
    }
    return (
      <I18n>
        {
          t => (
            <form className="login-form" onSubmit={this.submitForm}>
              <h4 className="title">
                {t(title)}
              </h4>
              <div className="form-container">
                { loginType !== LoginType.Login &&
                  <input
                    type="text"
                    name="username"
                    onChange={this.handleValueChange}
                    required
                    placeholder={t('your-name')}
                  />
                }
                { loginType !== LoginType.Guest &&
                  <input
                    type="text"
                    name="email"
                    onChange={this.handleValueChange}
                    required
                    placeholder={t('your-email')}
                  />
                }
                { loginType !== LoginType.Guest &&
                  <input
                    type="password"
                    name="password"
                    onChange={this.handleValueChange}
                    required
                    placeholder={t('your-password')}
                  />
                }
              </div>
              <div className="form-actions">
                <button className="button primary" type="submit">
                  { t(primaryButtonText) }
                  { loading && <i className="fas fa-cog fa-spin" /> }
                </button>
                <button
                  type="button"
                  className="button secondary"
                  onClick={() => this.setState({
                    loginType: nextState,
                  })}
                >
                  {t(secondaryButtonText)}
                </button>
                {
                  loginType === LoginType.Guest &&
                  <button
                    type="button"
                    className="button secondary"
                    onClick={() => this.setState({
                      loginType: LoginType.Signup,
                    })}
                  >
                    {t('want-account')}
                  </button>
                }
              </div>
              {
                message &&
                <div className="messages">
                  { t(message) }
                </div>
              }
            </form>
          )
        }
      </I18n>
    );
  }
}

export default Login;
