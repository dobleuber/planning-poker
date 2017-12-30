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
    const parsedQueryString = queryString.parse(this.props.location.search);
    const { username, email, password } = this.state;
    const redirect = parsedQueryString.redirect || '/';
    if (this.state.login) {
      if (email && password) {
        AuthenticateUserMutation(email, password, (id, token) => {
          Security.setCredentials(id, token);
          this.props.onLogin();
          this.props.history.push(redirect);
        });
      }
    } else if (email && password && username) {
      CreateUserMutation(email, password, username, (id, token) => {
        Security.setCredentials(id, token);
        this.props.onLogin();
        this.props.history.push(redirect);
      });
    }
  }

  render() {
    return (
      <I18n>
        {
          t => (
            <form className="login-form" onSubmit={this.submitForm}>
              <h4 className="title">
                {this.state.login ? t('login') : t('sign-up')}
              </h4>
              <div className="form-container">
                { !this.state.login &&
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
                <button className="button primary">
                  {this.state.login ? t('login') : t('create-account')}
                </button>
                <button
                  type="button"
                  className="button secondary"
                  onClick={() => this.setState({ login: !this.state.login })}
                >
                  {this.state.login ? t('need-account') : t('already-user')}
                </button>
              </div>
            </form>
          )
        }
      </I18n>
    );
  }
}

export default Login;
