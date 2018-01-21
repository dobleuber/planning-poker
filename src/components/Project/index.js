import React from 'react';
import { I18n } from 'react-i18next';
import {
  createFragmentContainer,
  graphql,
} from 'react-relay';

import './Project.css';
import Security from '../../utils/security';

import StoryList from '../StoryList';

const Project = ({ project, estimateStory, addProjectCollaborator }) => {
  const {
    id,
    name,
    description,
    userCreator,
  } = project;
  const userCreatorId = userCreator.id;
  const isOwner = userCreatorId === Security.userId;
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
              <div className="label">{t('owner')}</div>
              <div className="field">{userCreator.username}</div>
            </div>
            <div className="row">
              <StoryList
                addProjectCollaborator={addProjectCollaborator}
                collaborators={project.collaborators}
                estimateStory={estimateStory}
                isOwner={isOwner}
                projectId={id}
                stories={project.project}
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
    userCreator {
      id
      username
    }
  }
`);
