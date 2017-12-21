import React from 'react';
import { I18n } from 'react-i18next';
import {
  createFragmentContainer,
  graphql,
} from 'react-relay';

import './StoryList.css';

import StoryItem from '../StoryItem';

const StoryList = ({ projectId, stories, estimateStory }) => (
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
        </div>
      )
    }
  </I18n>
);

export default createFragmentContainer(StoryList, graphql`
  fragment StoryList_stories on StoryConnection {
    edges {
      node {
        ...StoryItem_story
      }
    }
  }
`);
