import React from 'react';
import { QueryRenderer, graphql } from 'react-relay';
import environment from '../../createRelayEnvironment';

import { ProjectList } from '../';

import './ProjectPage.css';

const query = graphql`
  query ProjectPageQuery {
    viewer {      
      ...ProjectList_viewer
    }
  }
`;

function ProjectPage() {
  return (
    <QueryRenderer
      environment={environment}
      query={query}
      render={({ error, props }) => {
        if (error) {
          return <div>{error.message}</div>;
        } else if (props) {
          return (
            <div className="project-page">
              <ProjectList viewer={props.viewer} />
            </div>
        );
        }
        return <div>Loading</div>;
      }}
    />
  );
}

export default ProjectPage;
