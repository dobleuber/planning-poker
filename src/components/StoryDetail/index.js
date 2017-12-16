import React, { Component } from 'react';
import { I18n } from 'react-i18next';

import './StoryDetail.css';

import { CreateStoryMutation, UpdateStoryMutation } from '../../mutations';

class StoryDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      url: '',
      estimation: '',
    };

    this.handleChangeValue = this.handleChangeValue.bind(this);
    this.createStory = this.createStory.bind(this);
  }

  handleChangeValue(event) {
    const { target } = event;
    const { value, name } = target;

    this.setState({
      [name]: value,
    });
  }

  createStory(event) {
    event.preventDefault();
    const { name, url, estimation } = this.state;
    const { projectId, storyId } = this.props.match.params;
    if (name) {
      if (storyId && storyId !== 'new') {
        UpdateStoryMutation(storyId, name, url, estimation, projectId);
      } else {
        CreateStoryMutation(name, url, estimation, projectId, res =>
          this.props.history.replace(`/project/${projectId}/story/${res.createStory.story.id}`));
      }
    }
  }

  render() {
    const { goBack } = this.props.history;
    return (
      <I18n>
        {
          t => (
            <div className="estimation-page">
              <h3>{t('estimate-story')}</h3>
              <form className="estimation-form">
                <div className="row">
                  <div className="column column-80p">
                    <div className="field">
                      <label htmlFor="name">
                        <span>
                          {t('name')}: *
                        </span>
                        <input
                          name="name"
                          type="text"
                          required
                          value={this.state.name}
                          onChange={this.handleChangeValue}
                        />
                      </label>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="column column-80p">
                    <div className="field">
                      <label htmlFor="url">
                        <span>
                          {t('url')}:
                        </span>
                        <input
                          name="url"
                          type="text"
                          value={this.state.url}
                          onChange={this.handleChangeValue}
                        />
                      </label>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="column column-80p">
                    <div className="field">
                      <label htmlFor="estimation">
                        <span>
                          {t('estimation')}:
                        </span>
                        <input
                          name="estimation"
                          type="text"
                          value={this.state.estimation}
                          onChange={this.handleChangeValue}
                        />
                      </label>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <button type="button" className="button secondary" onClick={goBack}>
                    {t('back')}
                  </button>
                  <button
                    type="submit"
                    className="button primary"
                    onClick={this.createStory}
                  >
                    {t('save')}
                  </button>
                </div>
              </form>
              <div className="help">
                *{t('save-story-help')}
              </div>
            </div>
          )
        }
      </I18n>
    );
  }
}

export default StoryDetail;
