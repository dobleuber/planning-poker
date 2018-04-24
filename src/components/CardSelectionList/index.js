import React, { Component } from 'react';
import { createFragmentContainer, graphql } from 'react-relay';
import { I18n } from 'react-i18next';

import groupBy from 'lodash.groupby';
import maxBy from 'lodash.maxby';
import values from 'lodash.values';
import flatten from 'lodash.flatten';

import './CardSelectionList.css';
import { SelectedCard } from '../';

import Security from '../../utils/security';

import { CardSelectionSubscription, NewStorySubscription } from '../../subscriptions';

class CardSelectionList extends Component {
  static setCardPositions(edges, showEstimation) {
    let initialTop = 250;

    const userVotes = edges.filter(({ node }) => !!node.card && node.card.value > -1);

    const groupedVotes = values(groupBy(userVotes, ({ node }) => node.card.value))
      .sort((current, next) => current[0].value > next[0].value);

    const deltaX = 1000 / groupedVotes.length;

    const positionedVotes = flatten(groupedVotes.map((cardGroup, groupIndex) =>
      cardGroup.map((card, cardIndex) => {
        const { id } = card.node;
        const x = (deltaX * groupIndex) + 110;
        const y = 150 - (25 * cardIndex * +showEstimation);
        return { id, x, y };
      })))
      .reduce((acc, item) => {
        acc[item.id] = item;
        return acc;
      }, {});

    return edges.map(({ node }, index) => {
      const { id, card, user } = node;
      const posVote = positionedVotes[id] || {};
      let { x, y } = posVote;
      initialTop = initialTop || y;
      y = card ? y : initialTop + 60;
      x = card && showEstimation ? x : (index + 1) * 80;
      return {
        id,
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
    const userVotes = edges.filter(({ node }) => !!node.card && node.card.value > -1);
    const results = values(groupBy(userVotes, ({ node }) => node.card.value));
    if (results && !results.length) {
      return {};
    }

    const moreVoted = maxBy(results, group => group.length);
    const moreVotedCard = moreVoted[0].node.card;

    const estimationResult = {
      moreVoted: {
        id: moreVotedCard.id,
        label: moreVotedCard.label,
        votes: moreVoted.length,
      },
    };

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
    const { moreVoted } = estimationResults;
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
                CardSelectionList.setCardPositions(selections.edges, showEstimation)
                .map(({
                  id,
                  card,
                  user,
                  position,
                }) => (
                  <SelectedCard
                    key={id}
                    position={position}
                    userName={user.username}
                    card={card}
                    showEstimation={showEstimation}
                  />))
              }
              {
                hasResults && moreVoted &&
                <div className={resultClassName}>
                  <div className="tile">{t('estimate')}</div>
                  <div className="votes more">
                    {moreVoted.label}: {moreVoted.votes} {t('votes')}
                  </div>
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
            isIcon
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
