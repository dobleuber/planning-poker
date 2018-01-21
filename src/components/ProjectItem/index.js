import React from 'react';
import { Link } from 'react-router-dom';
import {
  createFragmentContainer,
  graphql,
} from 'react-relay';

import Security from '../../utils/security';

import './ProjectItem.css';

const ProjectItem = ({ project }) => (
  <div className="project-item">
    <div className="column">
      <Link to={`/project/${project.id}`}>{project.name}</Link>
    </div>
    <div className="column description">{project.description}</div>
    {
      project.userCreator.id === Security.userId &&
      <div className="column">
        <Link to={`/project/${project.id}/story/new`}>New Story</Link>
      </div>
    }
  </div>);

export default createFragmentContainer(ProjectItem, graphql`
  fragment ProjectItem_project on Project {
    id
    name
    description
    userCreator {
      id
    }
  }
`);
