import React from 'react';
import { I18n } from 'react-i18next';
import {
  createFragmentContainer,
  graphql,
} from 'react-relay';

import './Project.css';

import StoryList from '../StoryList';

const Project = ({ project, estimateStory, addProjectCollaborator }) => {
  const { id, name, description } = project;
  return (
    <I18n>
      {
        t => (
          <div className="project">
            <div className="row">
              <div className="label">{t('name')}</div>
              <div className="field">{name}</div>
            </div>
            <div className="row">
              <div className="label">{t('description')}</div>
              <div className="field">{description}</div>
            </div>
            <div className="row">
              <StoryList
                projectId={id}
                stories={project.project}
                collaborators={project.collaborators}
                estimateStory={estimateStory}
                addProjectCollaborator={addProjectCollaborator}
              />
            </div>
          </div>
        )
      }
    </I18n>
  );
};

export default createFragmentContainer(Project, graphql`
  fragment Project_project on Project {
    id
    name
    description
    project {
      ...StoryList_stories
    }
    collaborators {
      ...StoryList_collaborators
    }
  }
`);
