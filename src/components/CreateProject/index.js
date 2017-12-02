import React, { Component } from 'react';
import './CreateProject.css';

import CreateProjectMutation from '../../mutations/CreateProjectMutation';

class CreateProject extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      description: '',
    };

    this.createProject = this.createProject.bind(this);
  }

  createProject() {
    const { name, description } = this.state;
    CreateProjectMutation(name, description, () => this.this.props.history.push('/'));
  }

  render() {
    return (
      <form className="create-project">
        <div className="row">
          <div className="column">
            <div className="field">
              <span>Name: *</span>
              <input
                name="name"
                type="text"
                value={this.state.name}
                required
                onChange={e => this.setState({
                  name: e.target.value,
                })}
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="column">
            <div className="field">
              <span>Description:</span>
              <textarea
                type="text"
                value={this.state.description}
                onChange={e => this.setState({
                  description: e.target.value,
                })}
                rows="7"
              />
            </div>
          </div>
        </div>
        <button
          type="submit"
          className="button"
          onClick={this.createProject}
        >
          Crear
        </button>
      </form>
    );
  }
}

export default CreateProject;
