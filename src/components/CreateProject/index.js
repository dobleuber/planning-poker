import React, { Component } from 'react';
import { I18n } from 'react-i18next';
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
    this.handleChangeValue = this.handleChangeValue.bind(this);
  }

  createProject(event) {
    event.preventDefault();
    const { name, description } = this.state;
    if (name) {
      CreateProjectMutation(name, description, () => this.props.history.push('/'));
    }
  }

  handleChangeValue(event) {
    const { target } = event;
    const { value, name } = target;

    this.setState({
      [name]: value,
    });
  }

  render() {
    return (
      <I18n>
        {
          t => (
            <form className="create-project" onSubmit={this.createProject}>
              <div className="row">
                <div className="column">
                  <div className="field">
                    <span>{t('name')}: *</span>
                    <input
                      name="name"
                      type="text"
                      value={this.state.name}
                      required
                      onChange={this.handleChangeValue}
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="column">
                  <div className="field">
                    <span>{t('description')}:</span>
                    <textarea
                      name="description"
                      type="text"
                      value={this.state.description}
                      onChange={this.handleChangeValue}
                      rows="7"
                    />
                  </div>
                </div>
              </div>
              <button
                type="submit"
                className="button primary"
              >
                {t('create')}
              </button>
            </form>
          )
        }
      </I18n>
    );
  }
}

export default CreateProject;
