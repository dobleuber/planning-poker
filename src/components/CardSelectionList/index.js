import React, { Component } from 'react';
import { createFragmentContainer, graphql } from 'react-relay';
import { I18n } from 'react-i18next';

import groupBy from 'lodash.groupby';
import maxBy from 'lodash.maxby';
import minBy from 'lodash.minby';
import values from 'lodash.values';

import './CardSelectionList.css';
import { SelectedCard } from '../';

import Security from '../../utils/security';

import { CardSelectionSubscription, NewStorySubscription } from '../../subscriptions';

class CardSelectionList extends Component {
  static setCardPositions(edges) {
    const k = 500;
    const h = 150;
    const step = (2 * Math.PI) / edges.length;
    let angle = (1 / 2) * Math.PI;
    let initialTop;

    return edges.map(({ node }, index) => {
      const { card, user } = node;
      let x = k + (Math.cos(angle) * k * 0.7);
      let y = h + (Math.sin(angle) * h * 0.7);
      initialTop = initialTop || y;
      y = card ? y : initialTop + 80;
      x = card ? x : (index + 1) * 90;
      angle += step;
      return {
        node,
        card,
        user,
        position: {
          x,
          y,
        },
      };
    });
  }

  static getEstimationResults(edges) {
    const userVotes = edges.filter(({ node }) => !!node.card);
    const results = values(groupBy(userVotes, ({ node }) => node.card.value));
    if (results && !results.length) {
      return {};
    }

    const moreVoted = maxBy(results, group => group.length);
    const maxValue = maxBy(results, group => group[0].node.card.value);
    const minValue = minBy(results, group => group[0].node.card.value);
    const moreVotedCard = moreVoted[0].node.card;
    const maxVotedCard = maxValue[0].node.card;
    const minVotedCard = minValue[0].node.card;

    const estimationResult = {
      moreVoted: {
        id: moreVotedCard.id,
        label: moreVotedCard.label,
        votes: moreVoted.length,
      },
      maxValue: {
        id: maxVotedCard.id,
        label: maxVotedCard.label,
      },
      minValue: {
        id: minVotedCard.id,
        label: minVotedCard.label,
      },
    };
    console.log(estimationResult);

    return estimationResult;
  }

  componentDidMount() {
    const { storyId, projectId, onNewStory } = this.props;
    this.subscriptions = [];
    this.subscriptions.push(CardSelectionSubscription(storyId));
    this.subscriptions.push(NewStorySubscription(projectId, (newStoryId) => {
      onNewStory(Security.userId, newStoryId, projectId);
    }));
  }

  componentWillUnmount() {
    this.subscriptions.forEach(sub => sub.dispose());
  }

  render() {
    const { selections, showEstimation } = this.props;
    const estimationResults = CardSelectionList.getEstimationResults(selections.edges);
    const {
      moreVoted,
      maxValue,
      minValue,
    } = estimationResults;
    const resultClassName = showEstimation
      ? 'estimation-results showEstimation'
      : 'estimation-results';

    const hasResults = showEstimation && selections && selections.edges.length;
    return (
      <I18n>
        {
          t => (
            <div className="card-selection-list">
              {
                CardSelectionList.setCardPositions(selections.edges)
                .map(({
                  node,
                  card,
                  user,
                  position,
                }) => (
                  <SelectedCard
                    key={node.id}
                    position={position}
                    userName={user.username}
                    card={card}
                    showEstimation={showEstimation}
                  />))
              }
              {
                hasResults &&
                <div className={resultClassName}>
                  <div className="tile">{t('estimate')}</div>
                  <div className="votes more">{moreVoted.label} {moreVoted.votes} {t('votes')}</div>
                  <div className="votes min">{minValue.label} {t('min')}</div>
                  <div className="votes max">{maxValue.label} {t('max')}</div>
                </div>
              }
            </div>
          )
        }
      </I18n>
    );
  }
}

export default createFragmentContainer(CardSelectionList, graphql`
  fragment CardSelectionList_selections on CardSelectionConnection{
    edges {
      node {
        ... on CardSelection {
          id
          card {
            id
            label
            value
          }

          user {
            id
            username
          }
        }
      }
    }
  }
`);
