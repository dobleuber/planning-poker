import React from 'react';
import { I18n } from 'react-i18next';
import {
  createFragmentContainer,
  graphql,
} from 'react-relay';

import './StoryList.css';

import Security from '../../utils/security';

import StoryItem from '../StoryItem';

const StoryList = ({
  projectId,
  stories,
  collaborators,
  estimateStory,
  addProjectCollaborator,
}) => {
  const { userId } = Security;
  const hasUser = collaborators.edges.some(({ node }) => node.id === userId);

  if (!hasUser) {
    addProjectCollaborator({ projectId, userId });
  }

  return (
    <I18n>
      {
        t => (
          <div className="story-list">
            <div className="story-list__header">
              {t('stories')}
            </div>
            <div className="story-list__table">
              <div className="row header">
                <div className="column name">{t('name')}</div>
                <div className="column url">{t('url')}</div>
                <div className="column estimate">{t('estimate')}</div>
              </div>
              {
                stories && stories.edges.map(({ node }) => (
                  <StoryItem
                    key={node.__id}
                    projectId={projectId}
                    story={node}
                    estimateStory={estimateStory}
                  />
                ))
              }
            </div>
            <div className="collaborator-list">
              <span className="collaborator-label">
                {t('collaborator-list')}:
              </span>
              {
                collaborators && collaborators.edges.map(({ node }) => (
                  <span className="collaborator-item" key={node.id}>{node.username}</span>
                ))
              }
            </div>
          </div>
        )
      }
    </I18n>
  );
};

export default createFragmentContainer(StoryList, graphql`
  fragment StoryList_stories on StoryConnection {
    edges {
      node {
        ...StoryItem_story
      }
    }
  }

  fragment StoryList_collaborators on UserConnection {
    edges {
      node {
        ... on User {
          id
          username
        }
      }
    }
  }
`);
