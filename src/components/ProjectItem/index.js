import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  createFragmentContainer,
  graphql,
} from 'react-relay';

import './ProjectItem.css';

const ProjectItem = ({ project }) => (
  <div className="project-item">
    <div className="column">{project.name}</div>
    <div className="column description">{project.description}</div>
    <div className="column">
      <NavLink exact to={`/project/${project.id}/story/new`}>New Story</NavLink>
    </div>
  </div>);

export default createFragmentContainer(ProjectItem, graphql`
  fragment ProjectItem_project on Project {
    id
    name
    description
  }
`);
