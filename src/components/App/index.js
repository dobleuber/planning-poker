import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { I18n } from 'react-i18next';
import logo from '../../logo.svg';
import './App.css';
import {
  CreateProject,
  Header,
  Login,
  ProjectListPage,
  ProjectPage,
  StoryPage,
} from '../';

import Security from '../../utils/security';

class App extends Component {
  constructor() {
    super();

    this.onLogin = this.onLogin.bind(this);
    this.logout = this.logout.bind(this);

    this.state = {
      userId: Security.userId,
    };
  }

  onLogin() {
    this.setState({
      userId: Security.userId,
    });
  }

  logout() {
    Security.clearCredentials();
    this.setState({
      userId: null,
    });
  }

  render() {
    const { userId } = this.state;
    return (
      <div className="App">
        <I18n>
          {
            t => (
              <header className="App-header">
                <h1 className="App-title">
                  {t('welcome')}
                  <img src={logo} className="App-logo" alt={t('alt-logo')} />
                </h1>
              </header>
            )
          }
        </I18n>
        <Header userId={userId} logout={this.logout} />
        <div className="container">
          <Switch>
            <Route exact path="/" component={ProjectListPage} />
            <Route
              exact
              path="/login"
              component={props => (<Login onLogin={this.onLogin} {...props} />)}
            />
            <Route exact path="/create" component={CreateProject} />
            <Route exact path="/project/:projectId" component={ProjectPage} />
            <Route exact path="/project/:projectId/story/:storyId" component={StoryPage} />
          </Switch>
        </div>
      </div>
    );
  }
}


export default App;
