import React, { Component } from 'react';
import {
  createFragmentContainer,
  graphql,
} from 'react-relay';

import { I18n } from 'react-i18next';

import Security from '../../utils/security';

import './Estimate.css';

import { Card, CardSelectionList } from '../';

import {
  AddProjectCollaboratorsMutation,
  ClearStoryVotesMutation,
  CreateCardSelectionMutation,
  UpdateCardSelectionMutation,
  UpdateCardSelectionStatusMutation,
  UpdateStoryShowEstimationMutation,
} from '../../mutations';


class Estimate extends Component {
  static selectCard({ estimationId, cardId, selection }) {
    UpdateCardSelectionMutation(estimationId, cardId, selection);
  }

  constructor(props) {
    super(props);
    this.changeUser = false;

    this.state = {};

    this.createCardSelection = this.createCardSelection.bind(this);
    this.showEstimate = this.showEstimate.bind(this);
    this.clearVotes = this.clearVotes.bind(this);
  }

  componentDidMount() {
    const { estimation } = this.props;
    const { userId } = Security;
    this.changeUser = estimation.user.id !== userId;
    const addNewCollaborator = !estimation.story.project.collaborators.edges
      .find(({ node }) => node.id === userId);

    if (addNewCollaborator) {
      const projectId = estimation.story.project.id;
      AddProjectCollaboratorsMutation(projectId, userId);
    }

    if (this.changeUser) {
      const userSelections = estimation.story.userSelections.edges;
      const userEstimation = userSelections.find(({ node }) => node.user.id === userId);
      if (userEstimation) {
        const { pathname } = document.location;
        const estimatePath = pathname.match(/estimate\/.*/)[0];
        const newEstimationPath = pathname.replace(estimatePath, `estimate/${userEstimation.node.id}`);
        this.props.history.replace(newEstimationPath);
      } else {
        const storyId = estimation.story.id;
        const projectId = estimation.story.project.id;
        this.createCardSelection(userId, storyId, projectId);
      }
    } else {
      const { id } = estimation;
      UpdateCardSelectionStatusMutation(id, true);
    }
  }

  componentWillUnmount() {
    const { estimation } = this.props;
    const { id } = estimation;
    UpdateCardSelectionStatusMutation(id, false);
  }

  clearVotes() {
    const { story } = this.props.estimation;
    const { id } = story;
    ClearStoryVotesMutation(id, (err, res) => {
      if (err) {
        console.error(err);
      } else if (res) {
        console.log(res);
      }
    });
  }

  createCardSelection(userId, storyId, projectId) {
    CreateCardSelectionMutation(userId, storyId, (res) => {
      if (res && res.createCardSelection && res.createCardSelection.cardSelection) {
        const estimateId = res.createCardSelection.cardSelection.id;
        this.props.history.replace(`/project/${projectId}/story/${storyId}/estimate/${estimateId}`);
      }
    });
  }

  showEstimate(event) {
    event.preventDefault();
    const { story } = this.props.estimation;
    const { id, showEstimation } = story;
    UpdateStoryShowEstimationMutation(id, !showEstimation);
  }

  render() {
    const { estimation, projectId, specialCards } = this.props;
    const { story, card } = estimation;
    const { name, url, showEstimation } = story;

    const selectedCardId = card && card.id;
    const isOwner = story.project.userCreator.id === Security.userId;

    return (
      <I18n>
        {
          t => (
            <div className="estimate">
              <div className="row">
                <div className="col">
                  <div className="row">
                    <div className="label">{t('name')}</div>
                    <div className="field">{name}</div>
                  </div>
                  <div className="row">
                    <div className="label">{t('url')}</div>
                    <div className="field">{url}</div>
                  </div>
                </div>
                <div className="col show-estimation">
                  {
                    isOwner &&
                    <button
                      type="button"
                      className="button secondary"
                      onClick={this.showEstimate}
                    >
                      {t('show-estimate')}
                    </button>
                  }
                </div>
                <div className="col show-estimation">
                  {
                    isOwner &&
                    <button
                      type="button"
                      className="button secondary"
                      onClick={this.clearVotes}
                    >
                      {t('clear-votes')}
                    </button>
                  }
                </div>
              </div>
              <div className="row">
                <div className="game-container">
                  <CardSelectionList
                    projectId={projectId}
                    storyId={story.id}
                    selections={story.selections}
                    showEstimation={showEstimation}
                    onNewStory={this.createCardSelection}
                  />
                </div>
              </div>
              <div className="row">
                <div className="card-container">
                  <div className="deck-cards">
                    {
                      story.project.deckType.cards.edges.map(({ node }) => (
                        <Card
                          key={node.__id}
                          card={node}
                          estimationId={estimation.id}
                          onSelectCard={Estimate.selectCard}
                          selectedCardId={selectedCardId}
                        />
                      ))
                    }
                  </div>
                  <div className="special-cards">
                    {
                      specialCards.allCards.edges.map(({ node }) => (
                        <Card
                          key={node.__id}
                          card={node}
                          estimationId={estimation.id}
                          onSelectCard={Estimate.selectCard}
                          selectedCardId={selectedCardId}
                          isIcon="true"
                        />
                      ))
                    }
                  </div>
                </div>
              </div>
            </div>
          )
        }
      </I18n>
    );
  }
}

export default createFragmentContainer(Estimate, graphql`
  fragment Estimate_specialCards on Viewer {
    allCards (filter: { deckType: null }) {
      edges {
        node {
          ...Card_card
        }
      }
    }
  }

  fragment Estimate_estimation on CardSelection {
    id
    story {
      id
      name
      url
      showEstimation
      project {
        id
        deckType {
          id
          name
          cards {
            edges {
              node {
                ...Card_card
              }
            }
          }
        }
        userCreator {
          id
        }
        collaborators {
          edges {
            node {
              id
            }
          }
        }
      }
      userSelections: selections {
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

      selections {
        ...CardSelectionList_selections
      }
    }

    card {
      id
      label
    }

    user {
      id
    }
  }
`);
