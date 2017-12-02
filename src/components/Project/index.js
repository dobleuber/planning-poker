import React from 'react';
import {
  createFragmentContainer,
  graphql,
} from 'react-relay';

const Project = ({ project }) => {
  const { id, name, description } = project;
  return (
    <div>
      <div className="row">
        <div className="label">ID</div>
        <div className="field">{id}</div>
      </div>
      <div className="row">
        <div className="label">Name</div>
        <div className="field">{name}</div>
      </div>
      <div className="row">
        <div className="label">Description</div>
        <div className="field">{description}</div>
      </div>
    </div>
  );
};

export default createFragmentContainer(Project, graphql`
  fragment Project_project on Project {
    id
    name
    description
  }
`);
