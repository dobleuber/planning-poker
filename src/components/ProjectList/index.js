import React from 'react';
import { I18n } from 'react-i18next';

import {
  createFragmentContainer,
  graphql,
} from 'react-relay';

import './ProjectList.css';

import ProjectItem from '../ProjectItem';

const ProjectList = ({ viewer }) => (
  <I18n>
    {
      t => (
        <div className="project-list">
          <div className="project-list__header">
            { t('projectsYouHave', { count: viewer.allProjects.edges.length }) }
          </div>
          <div className="project-list__table">
            <div className="row header">
              <div className="column">{t('name')}</div>
              <div className="column description">{t('description')}</div>
            </div>
            {
              viewer.allProjects.edges.map(({ node }) => (
                <ProjectItem
                  key={node.__id}
                  project={node}
                  className="row"
                />
              ))
            }
          </div>
        </div>
      )
    }
  </I18n>
);


export default createFragmentContainer(ProjectList, graphql`
fragment ProjectList_viewer on Viewer {
  allProjects {
    edges {
      node {
        ...ProjectItem_project
      }
    }
  }
}`);
