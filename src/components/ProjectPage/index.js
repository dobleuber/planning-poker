import React, { Component } from 'react';
import { QueryRenderer, graphql } from 'react-relay';
import environment from '../../createRelayEnvironment';

import './ProjectPage.css';

import { Project } from '../';
import createCardSelectionMutation from '../../mutations/CreateCardSelectionMutation';

const query = graphql`
  query ProjectPageQuery($projectId: ID!) {
    node(id: $projectId) {
      ...Project_project
    }
  }
`;

class ProjectPage extends Component {
  constructor(props) {
    super(props);

    this.estimateStory = this.estimateStory.bind(this);
  }

  estimateStory({ userId, storyId }) {
    const { match } = this.props;
    const { projectId } = match.params;
    createCardSelectionMutation(userId, storyId, (res) => {
      if (res && res.createCardSelection && res.createCardSelection.cardSelection) {
        const estimateId = res.createCardSelection.cardSelection.id;
        this.props.history.push(`/project/${projectId}/story/${storyId}/estimate/${estimateId}`);
      }
    });
  }

  render() {
    const { match } = this.props;
    const { projectId } = match.params;
    return (
      <QueryRenderer
        environment={environment}
        query={query}
        variables={{
          projectId,
        }}
        render={({ error, props }) => {
          if (error) {
            return <div>{error.message}</div>;
          } else if (props) {
            return (
              <div className="project-page">
                <Project
                  project={props.node}
                  estimateStory={this.estimateStory}
                />
              </div>
              );
            }
            return <div>Loading</div>;
          }
        }
      />
    );
  }
}

export default ProjectPage;
