import React from 'react';
import { Link } from 'react-router-dom';
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
    <div className="row story-item">
      <div className="column description">
        <Link to={`/project/${projectId}/story/${id}`}>
          {name}
        </Link>
      </div>
      <div className="column url">
        {url}
      </div>
      <div className="column estimate">
        {estimation}
      </div>
    </div>
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
