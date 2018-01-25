import React, { Component } from 'react';
import { I18n } from 'react-i18next';
import {
  createFragmentContainer,
  graphql,
} from 'react-relay';

import './StoryDetail.css';

import Security from '../../utils/security';

import {
  CreateCardSelectionMutation,
  CreateStoryMutation,
  UpdateStoryMutation,
  UpdateStoryShowEstimationMutation,
} from '../../mutations';

class StoryDetail extends Component {
  constructor(props) {
    super(props);
    const { story } = props;
    const {
      name = '',
      url = '',
      estimation,
      showEstimation,
    } = story || {};
    this.state = {
      name,
      url,
      estimation: estimation || '',
      showEstimation,
    };

    this.handleChangeValue = this.handleChangeValue.bind(this);
    this.createStory = this.createStory.bind(this);
    this.showEstimate = this.showEstimate.bind(this);
  }

  componentDidMount() {
    const { story } = this.props;
    const { userId } = Security;
    if (story && story.project.userCreator.id !== userId) {
      const selections = story.selections.edges;
      const userEstimation = selections.find(({ node }) => node.user.id === userId);
      if (userEstimation) {
        const { pathname } = document.location;
        const newEstimationPath = `${pathname}/estimate/${userEstimation.node.id}`;
        this.props.history.replace(newEstimationPath);
      } else {
        const storyId = story.id;
        const projectId = story.project.id;
        CreateCardSelectionMutation(userId, storyId, (res) => {
          if (res && res.createCardSelection && res.createCardSelection.cardSelection) {
            const estimateId = res.createCardSelection.cardSelection.id;
            this.props.history.replace(`/project/${projectId}/story/${storyId}/estimate/${estimateId}`);
          }
        });
      }
    }
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
    const { projectId, storyId } = this.props;
    if (name) {
      if (storyId && storyId !== 'new') {
        UpdateStoryMutation(storyId, name, url, estimation, projectId);
      } else {
        CreateStoryMutation(name, url, estimation, projectId, res =>
          this.props.history.replace(`/project/${projectId}/story/${res.createStory.story.id}`));
      }
    }
  }

  showEstimate(event) {
    event.preventDefault();
    const { storyId } = this.props;
    const { showEstimation } = this.state;
    this.setState({
      showEstimation: !showEstimation,
    }, () => UpdateStoryShowEstimationMutation(storyId, !showEstimation));
  }

  render() {
    const { storyId } = this.props;
    const { goBack } = this.props.history;
    const isNew = storyId === 'new';
    return (
      <I18n>
        {
          t => (
            <div className="story-detail">
              <h3>{t('story-details')}</h3>
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
                  {
                    !isNew &&
                    <button
                      type="button"
                      className="button secondary"
                      onClick={this.showEstimate}
                    >
                      {t('show-estimate')}
                    </button>
                  }
                </div>
              </form>
              {
                !storyId &&
                <div className="help">
                *{t('save-story-help')}
                </div>
              }
            </div>
          )
        }
      </I18n>
    );
  }
}

export default createFragmentContainer(StoryDetail, graphql`
  fragment StoryDetail_story on Story {
    id
    name
    estimation
    showEstimation
    url
    project {
      userCreator {
        id
      }
    }

    selections {
      edges {
        node {
          ... on CardSelection {
            id
            user {
              id
            }
          }
        }
      }
    }
  }
`);
