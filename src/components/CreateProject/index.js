import React, { Component } from 'react';
import { I18n } from 'react-i18next';
import './CreateProject.css';

import { CreateProjectMutation } from '../../mutations';

import Security from '../../utils/security';

class CreateProject extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      description: '',
      loading: false,
    };

    this.createProject = this.createProject.bind(this);
    this.handleChangeValue = this.handleChangeValue.bind(this);
  }

  createProject(event) {
    event.preventDefault();
    const { name, description } = this.state;
    this.setState({ loading: true });
    if (name) {
      CreateProjectMutation(name, description, Security.userId, (err, res) => {
        this.setState({ loading: false });
        if (res.createProject) {
          this.props.history.push('/');
        }
      });
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
                <div className="column column-80p">
                  <div className="field">
                    <label htmlFor="name">{t('name')}: *
                      <input
                        name="name"
                        type="text"
                        value={this.state.name}
                        required
                        onChange={this.handleChangeValue}
                      />
                    </label>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="column column-80p">
                  <div className="field">
                    <label htmlFor="description">
                      {t('description')}:
                      <textarea
                        name="description"
                        type="text"
                        value={this.state.description}
                        onChange={this.handleChangeValue}
                        rows="7"
                      />
                    </label>
                  </div>
                </div>
              </div>
              <button
                type="submit"
                className="button primary"
              >
                {t('create')}
                {this.state.loading && <i className="fas fa-cog fa-spin" />}
              </button>
            </form>
          )
        }
      </I18n>
    );
  }
}

export default CreateProject;
