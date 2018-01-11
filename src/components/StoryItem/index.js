import React from 'react';
import { Link } from 'react-router-dom';
import { I18n } from 'react-i18next';
import {
  createFragmentContainer,
  graphql,
} from 'react-relay';

import './StoryItem.css';

import Security from '../../utils/security';

const StoryItem = ({ projectId, story, estimateStory }) => {
  const {
    id, name, url, estimation,
  } = story;

  const { userId } = Security;

  const cartSelections = story.selections.edges.filter(({ node }) => userId === node.user.id);

  const cardSelectionId = cartSelections.length ? cartSelections[0].node.id : null;

  const params = {
    projectId,
    storyId: id,
    userId,
    cardSelectionId,
  };

  return (
    <I18n>
      {
        t => (
          <div className="row story-item">
            <div className="column name">
              <Link to={`/project/${projectId}/story/${id}`}>
                {name}
              </Link>
            </div>
            <div className="column url">
              {url && <a href={url} target="story_details">{url}</a>}
            </div>
            <div className="column estimate">
              { estimation || <button onClick={() => estimateStory(params)} >{t('estimate-story')}</button> }
            </div>
          </div>
        )
      }
    </I18n>
  );
};

export default createFragmentContainer(StoryItem, graphql`
  fragment StoryItem_story on Story {
    id
    name
    url
    estimation
    selections {
      edges {
        node {
          ... on CardSelection {
            id
            user {
              id
            }
          }
        }
      }
    }
  }
`);
