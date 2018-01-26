import React, { Component } from 'react';
import { I18n } from 'react-i18next';
import queryString from 'query-string';

import './Login.css';

import { AuthenticateUserMutation, CreateUserMutation } from '../../mutations';

import Security from '../../utils/security';

class Login extends Component {
  static saveUserData(id, token) {
    localStorage.setItem('USER_ID', id);
    localStorage.setItem('USER_Token', token);
  }

  constructor() {
    super();
    this.state = {
      login: true,
      email: '',
      password: '',
      username: '',
      message: '',
      loading: false,
    };

    this.handleValueChange = this.handleValueChange.bind(this);
    this.submitForm = this.submitForm.bind(this);
  }

  handleValueChange(event) {
    const { target } = event;
    const { name, value } = target;

    this.setState({
      [name]: value,
    });
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
    if (this.state.login) {
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
    } else if (email && password && username) {
      CreateUserMutation(email, password, username, (err, id, token) => {
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
  }

  render() {
    const { login, message, loading } = this.state;
    return (
      <I18n>
        {
          t => (
            <form className="login-form" onSubmit={this.submitForm}>
              <h4 className="title">
                {login ? t('login') : t('sign-up')}
              </h4>
              <div className="form-container">
                { !login &&
                  <input
                    type="text"
                    name="username"
                    onChange={this.handleValueChange}
                    required
                    placeholder={t('your-name')}
                  />
                }
                <input
                  type="text"
                  name="email"
                  onChange={this.handleValueChange}
                  required
                  placeholder={t('your-email')}
                />
                <input
                  type="password"
                  name="password"
                  onChange={this.handleValueChange}
                  required
                  placeholder={t('your-password')}
                />
              </div>
              <div className="form-actions">
                <button className="button primary" type="submit">
                  { login ? t('login') : t('create-account') }
                  { loading && <i className="fas fa-cog fa-spin" /> }
                </button>
                <button
                  type="button"
                  className="button secondary"
                  onClick={() => this.setState({ login: !login })}
                >
                  {login ? t('need-account') : t('already-user')}
                </button>
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
