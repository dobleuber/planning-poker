import React from 'react';
import { Link } from 'react-router-dom';
import { I18n } from 'react-i18next';
import {
  createFragmentContainer,
  graphql,
} from 'react-relay';

import './StoryItem.css';

const StoryItem = ({ projectId, story }) => {
  const {
    id, name, url, estimation,
  } = story;
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
              { estimation || <Link to={`/project/${projectId}/story/${id}/estimate`} >{t('estimate-story')}</Link> }
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
  }
`);
