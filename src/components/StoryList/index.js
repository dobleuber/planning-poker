import React from 'react';
import {
  createFragmentContainer,
  graphql,
} from 'react-relay';

import './StoryList.css';

import StoryItem from '../StoryItem';

const StoryList = ({ projectId, stories }) => (
  <div className="story-list">
    <div className="story-list__header">
      Stories
    </div>
    <div className="story-list__table">
      <div className="row header">
        <div className="column name">name</div>
        <div className="column url">url</div>
        <div className="column estimate">estimate</div>
      </div>
      {
        stories && stories.edges.map(({ node }) =>
          <StoryItem key={node.__id} projectId={projectId} story={node} />)
      }
    </div>
  </div>
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
