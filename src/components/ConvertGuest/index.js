import React, { Component } from 'react';
import { I18n } from 'react-i18next';
import { graphql, QueryRenderer } from 'react-relay';
import environment from '../../createRelayEnvironment';

import {
  ConvertGuestUserMutation,
} from '../../mutations';

import Security from '../../utils/security';

const query = graphql`
  query ConvertGuestQuery($id: ID!) {
    node(id: $id) {
      ... on User {
        id
        username
        email
      }
    }
  }
`;

class ConvertGuest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      username: '',
      password: '',
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

    const { userId } = this.props.match.params;
    const { username, email, password } = this.state;

    ConvertGuestUserMutation(userId, email, password, username, (err, id, token) => {
      if (err) {
        this.setState({
          message: err[0].functionError,
          loading: false,
        });
      } else {
        Security.setCredentials(id, token);
        Security.removeGuest();
        this.props.onLogin();
        this.props.history.replace('/');
      }
    });
  }

  render() {
    const { userId } = this.props.match.params;
    return (
      <QueryRenderer
        environment={environment}
        query={query}
        variables={{
          id: userId,
        }}
        render={({ error, props }) => {
          if (error) {
            return <div>{error.message}</div>;
          } else if (props) {
            const {
              loading,
              message,
            } = this.state;

            const { username } = props.node;

            return (
              <I18n>
                {
                  t => (
                    <form className="login-form" onSubmit={this.submitForm}>
                      <h4 className="title">
                        {t('sign-up')}
                      </h4>
                      <div className="form-container">
                        <input
                          type="text"
                          name="username"
                          onChange={this.handleValueChange}
                          required
                          placeholder={username}
                        />
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
                          { t('set-password') }
                          { loading && <i className="fas fa-cog fa-spin" /> }
                        </button>
                        <button
                          type="button"
                          className="button secondary"
                        >
                          {t('cancel')}
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
            return <div>Loading</div>;
          }
        }
      />
    );
  }
}

export default ConvertGuest;
