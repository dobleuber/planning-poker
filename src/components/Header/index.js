import React from 'react';
import { NavLink } from 'react-router-dom';
import { withRouter } from 'react-router';
import { I18n } from 'react-i18next';

import './Header.css';

const Header = () => (
  <I18n>
    {
      t => (
        <div className="header">
          <div className="title">
            Scrum Poker
          </div>
          <div className="link">
            <NavLink exact to="/">{t('projectList')}</NavLink>
          </div>
          <div className="link">
            <NavLink exact to="/create">{t('newProject')}</NavLink>
          </div>
          <div className="link login">
            <NavLink exact to="/login">{t('login')}</NavLink>
          </div>
        </div>
      )
    }
  </I18n>
);

export default withRouter(Header);
