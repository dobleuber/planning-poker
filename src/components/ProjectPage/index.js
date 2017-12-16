import React from 'react';
import { QueryRenderer, graphql } from 'react-relay';
import environment from '../../createRelayEnvironment';

import './ProjectPage.css';

import { Project } from '../';

const query = graphql`
  query ProjectPageQuery($projectId: ID!) {
    node(id: $projectId) {
      ...Project_project
    }
  }
`;

const ProjectPage = (properties) => {
  const { projectId } = properties.match.params;
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
                <Project project={props.node} />
              </div>
            );
          }

          return <div>Loading</div>;
        }
      }
    />
  );
};

export default ProjectPage;
