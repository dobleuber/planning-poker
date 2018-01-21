import React, { Component } from 'react';
import {
  createFragmentContainer,
  graphql,
} from 'react-relay';

import Security from '../../utils/security';

import './Estimate.css';

import { Card, CardSelectionList } from '../';

import {
  CreateCardSelectionMutation,
  UpdateCardSelectionMutation,
  UpdateCardSelectionStatusMutation,
} from '../../mutations';


class Estimate extends Component {
  static selectCard({ estimationId, cardId, selection }) {
    UpdateCardSelectionMutation(estimationId, cardId, selection);
  }

  constructor(props) {
    super(props);
    this.changeUser = false;

    this.state = {};
  }

  componentDidMount() {
    const { estimation } = this.props;
    const { userId } = Security;
    this.changeUser = estimation.user.id !== userId;
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
        CreateCardSelectionMutation(userId, storyId, (res) => {
          if (res && res.createCardSelection && res.createCardSelection.cardSelection) {
            const estimateId = res.createCardSelection.cardSelection.id;
            this.props.history.replace(`/project/${projectId}/story/${storyId}/estimate/${estimateId}`);
          }
        });
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

  render() {
    const { estimation } = this.props;
    const { story, card } = estimation;
    const { name, url } = story;

    const selectedCardId = card && card.id;

    return (
      <div className="estimate">
        <div className="row">
          <div className="label">Name</div>
          <div className="field">{name}</div>
        </div>
        <div className="row">
          <div className="label">url</div>
          <div className="field">{url}</div>
        </div>
        <div className="row">
          <div className="game-container">
            <CardSelectionList
              storyId={story.id}
              selections={story.selections}
            />
          </div>
        </div>
        <div className="row">
          <div className="card-container">
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
        </div>
      </div>
    );
  }
}

export default createFragmentContainer(Estimate, graphql`
  fragment Estimate_estimation on CardSelection {
    id
    story {
      id
      name
      url
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
