import React, { Component } from 'react';
import { AsyncStorage, View, ActivityIndicator, StyleSheet } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import SwipeCards from 'react-native-swipe-cards';
import * as ApiRedditDataActions from '../actions/redditData';
import Card from '../components/Card';

const styles = StyleSheet.create({
  loadingContainer: { flex: 1, paddingTop: 20 },
  container: { flex: 1, display: 'flex', alignItems: 'center' },
});

class Overview extends Component {

  static propTypes = {
    redditData: PropTypes.shape(),
    callRedditDataRequest: PropTypes.func.isRequired,
  };

  static defaultProps = {
    redditData: [],
  };

  componentWillMount = () => {
    const { callRedditDataRequest } = this.props;
    callRedditDataRequest();
  }

  handleYup = (cardData) => {
    this.saveCardStatus(cardData.data.id, 'approved');
  }

  handleNope = (cardData) => {
    this.saveCardStatus(cardData.data.id, 'disapproved');
  }

  saveCardStatus = (id, status = 'approved') => {
    let key = 'ApprovedList';
    if (status === 'disapproved') key = 'DisapprovedList';
    AsyncStorage.getItem(key, (error, listString) => {
      const list = JSON.parse(listString || '[]');
      if (list.indexOf(id) === -1) list.push(id);
      AsyncStorage.setItem(key, JSON.stringify(list), () => {});
    });
  }

  render() {
    const { redditData } = this.props;
    const { loading, data } = redditData;
    if (loading) {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator />
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <SwipeCards
          cards={data}
          renderCard={cardData => <Card {...cardData} />}
          renderNoMoreCards={() => null}
          handleYup={this.handleYup}
          handleNope={this.handleNope}
        />
      </View>
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators(ApiRedditDataActions, dispatch);

const mapStateToProps = state => ({
  redditData: state.redditData,
});

export default connect(mapStateToProps, mapDispatchToProps)(Overview);
