import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { I18n } from 'react-i18next';
import logo from '../../logo.svg';
import './App.css';
import {
  CreateProject,
  Header,
  Login,
  ProjectPage,
} from '../';

function App() {
  return (
    <div className="App">
      <I18n>
        {
          t => (
            <header className="App-header">
              <img src={logo} className="App-logo" alt={t('alt-logo')} />
              <h1 className="App-title">{t('welcome')}</h1>
            </header>
          )
        }
      </I18n>
      <Header />
      <div className="container">
        <Switch>
          <Route exact path="/" component={ProjectPage} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/create" component={CreateProject} />
        </Switch>
      </div>
    </div>
  );
}


export default App;
