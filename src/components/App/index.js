import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import copy from 'copy-to-clipboard';
import { ToastContainer, toast } from 'react-toastify';

import { I18n } from 'react-i18next';
import i18next from 'i18next';
import logo from '../../logo.svg';
import './App.css';
import {
  ConvertGuest,
  CreateProject,
  EstimatePage,
  Header,
  Login,
  ProjectListPage,
  ProjectPage,
  StoryPage,
} from '../';

import Security from '../../utils/security';

class App extends Component {
  static onInvite(event) {
    copy(document.location);
    toast(
      i18next.t('invite-confirm'),
      {
        position: toast.POSITION.BOTTOM_CENTER,
      },
    );
    event.preventDefault();
  }

  constructor() {
    super();

    this.onLogin = this.onLogin.bind(this);
    this.logout = this.logout.bind(this);

    this.state = {
      userId: Security.userId,
      isGuest: Security.isGuest,
    };
  }

  componentDidMount() {
    const { location } = document;
    if (!Security.userId &&
      !location.pathname.match(/login/) &&
      location.pathname.match(/project/)
    ) {
      location.replace(`/login/?redirect=${location.pathname}`);
    }
  }

  onLogin() {
    this.setState({
      userId: Security.userId,
      isGuest: Security.isGuest,
    });
  }

  logout() {
    Security.clearCredentials();
    this.setState({
      userId: null,
      isGuest: Security.isGuest,
    }, () => {
      document.location.assign('/login');
    });
  }


  render() {
    const { userId, isGuest } = this.state;
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
        <Header userId={userId} isGuest={isGuest} logout={this.logout} onInvite={App.onInvite} />
        <div className="container">
          <Switch>
            <Route exact path="/" component={ProjectListPage} />
            <Route
              exact
              path="/login"
              component={props => (<Login onLogin={this.onLogin} {...props} />)}
            />
            <Route
              exact
              path="/login/:userId/setpassword"
              component={props => (<ConvertGuest onLogin={this.onLogin} {...props} />)}
            />
            <Route exact path="/create" component={CreateProject} />
            <Route exact path="/project/:projectId" component={ProjectPage} />
            <Route exact path="/project/:projectId/story/:storyId" component={StoryPage} />
            <Route
              exact
              path="/project/:projectId/story/:storyId/estimate/:estimateId"
              component={EstimatePage}
            />
          </Switch>
        </div>
        <ToastContainer />
      </div>
    );
  }
}


export default App;
