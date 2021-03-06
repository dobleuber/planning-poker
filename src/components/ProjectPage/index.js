import React, { Component } from 'react';
import { QueryRenderer, graphql } from 'react-relay';

import environment from '../../createRelayEnvironment';

import './ProjectPage.css';

import { Project } from '../';
import { CreateCardSelectionMutation, AddProjectCollaboratorsMutation } from '../../mutations';

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
    this.addProjectCollaborator = this.addProjectCollaborator.bind(this);
  }

  estimateStory({
    projectId,
    userId,
    storyId,
    cardSelectionId,
  }) {
    if (cardSelectionId) {
      this.props.history.push(`/project/${projectId}/story/${storyId}/estimate/${cardSelectionId}`);
    } else {
      CreateCardSelectionMutation(userId, storyId, (res) => {
        if (res && res.createCardSelection && res.createCardSelection.cardSelection) {
          const estimateId = res.createCardSelection.cardSelection.id;
          this.props.history.push(`/project/${projectId}/story/${storyId}/estimate/${estimateId}`);
        }
      });
    }
  }

  addProjectCollaborator({ projectId, userId }) {
    AddProjectCollaboratorsMutation(projectId, userId, (res) => {
      if (res && res.projectsInvolvedProject) {
        console.log('new user added', this.props.node.id);
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
                  addProjectCollaborator={this.addProjectCollaborator}
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
