import React, { Component } from 'react';
import { QueryRenderer, graphql } from 'react-relay';
import environment from '../../createRelayEnvironment';

import { ProjectList } from '../';
import NewStorySubscription from '../../subscriptions/NewStorySubscription';

import Security from '../../utils/security';

import './ProjectListPage.css';

const query = graphql`
  query ProjectListPageQuery($filter: ProjectFilter) {
    viewer {
      ...ProjectList_viewer @arguments(filter: $filter)
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
    const filter = {
      OR: [
        {
          userCreator: {
            id: Security.userId,
          },
        },
        {
          collaborators_some: {
            id: Security.userId,
          },
        },
      ],
    };
    return (
      <QueryRenderer
        environment={environment}
        query={query}
        variables={{ filter }}
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
