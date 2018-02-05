import React from 'react';
import { NavLink } from 'react-router-dom';
import { withRouter } from 'react-router';
import { I18n } from 'react-i18next';

import './Header.css';

const Header = ({
  userId,
  isGuest,
  logout,
  location,
  onInvite,
}) => {
  const regexProjectId = /project\/(\w+)(\/story)?/;
  const pathname = location.pathname || '';
  const match = pathname.match(regexProjectId);
  let projectId = null;
  if (match) {
    [, projectId] = match;
  }

  return (
    <I18n>
      {
        (t, { i18n }) => (
          <div className="header">
            <div className="title">
              Scrum Poker
            </div>
            <div className="link">
              {userId && <NavLink exact to="/">{t('projectList')}</NavLink>}
            </div>
            <div className="link">
              {userId && <NavLink exact to="/create">{t('newProject')}</NavLink>}
            </div>
            { projectId &&
              <div className="link">
                <NavLink to={`/project/${projectId}/story/new`}>{t('newStory')}</NavLink>
              </div>
            }
            { projectId &&
              <div className="link invite">
                <button onClick={onInvite}>{t('invite')}</button>
              </div>
            }
            <div className="link dropdown right">
              <div className="selected">
                {i18n.language && i18n.language.toUpperCase()}
              </div>
              <div className="dropdown-content">
                <button onClick={() => i18n.language !== 'en' && i18n.changeLanguage('en')}>EN</button>
                <button onClick={() => i18n.language !== 'es' && i18n.changeLanguage('es')}>ES</button>
              </div>
            </div>
            {
              isGuest &&
              <div className="link login">
                <NavLink exact to={`/login/${userId}/setpassword`}>{t('set-password')}</NavLink>
              </div>
            }
            <div className="link login">
              {userId ? <button onClick={logout} >{t('logout')}</button> : <NavLink exact to="/login">{t('login')}</NavLink>}
            </div>
          </div>
        )
      }
    </I18n>
  );
};

export default withRouter(Header);
