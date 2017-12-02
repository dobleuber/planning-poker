import React from 'react';
import {
  createFragmentContainer,
  graphql,
} from 'react-relay';

import './ProjectItem.css';

const ProjectItem = ({ project }) => (
  <div className="project-item">
    <div className="column">{project.name}</div>
    <div className="column description">{project.description}</div>
  </div>);

export default createFragmentContainer(ProjectItem, graphql`
  fragment ProjectItem_project on Project {
    id
    name
    description
  }
`);
