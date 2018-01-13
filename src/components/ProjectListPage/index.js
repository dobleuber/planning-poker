import React, { Component } from 'react';
import { QueryRenderer, graphql } from 'react-relay';
import environment from '../../createRelayEnvironment';

import { ProjectList } from '../';
import NewStorySubscription from '../../subscriptions/NewStorySubscription';

import './ProjectListPage.css';

const query = graphql`
  query ProjectListPageQuery {
    viewer {
      ...ProjectList_viewer
    }
  }
`;

class ProjectListPage extends Component {
  componentDidMount() {
    this.subscription = NewStorySubscription();
  }

  componentWillUnmount() {
    this.subscription.dispose();
  }

  render() {
    return (
      <QueryRenderer
        environment={environment}
        query={query}
        render={({ error, props }) => {
            if (error) {
              return <div>{error.message}</div>;
            } else if (props) {
              return (
                <div className="project-list-page">
                  <ProjectList
                    viewer={props.viewer}
                  />
                </div>
            );
          }
          return <div>Loading</div>;
        }}
      />
    );
  }
}

export default ProjectListPage;
