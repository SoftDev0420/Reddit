import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FlatList, AsyncStorage } from 'react-native';
import { connect } from 'react-redux';

import CardStatusItem from '../components/CardStatusItem';

class ApproveList extends Component {

  static propTypes = {
    redditData: PropTypes.shape(),
  };

  static defaultProps = {
    redditData: {
      data: [],
    },
  };

  state = { filteredRedditData: [] };

  componentWillMount = () => {
    this.getFilteredData(filteredRedditData => this.setState({ filteredRedditData }));
  }

  getFilteredData = (callback) => {
    const { redditData } = this.props;
    const { data } = redditData;
    AsyncStorage.getItem('ApprovedList', (errApproved, approvedListString) => {
      const approvedList = JSON.parse(approvedListString || '[]');
      AsyncStorage.getItem('DisapprovedList', (errDisapproved, disapprovedListString) => {
        const disapprovedList = JSON.parse(disapprovedListString || '[]');
        const filteredList = data.map(item => ({
          ...item,
          status:
            approvedList.indexOf(item.data.id) !== -1
              ? 'approved'
              : ((disapprovedList.indexOf(item.data.id) !== -1) && 'disapproved') || null,
        })).filter(item => item.status);
        callback(filteredList);
      });
    });
  }

  keyExtractor = item => item.data.id;

  renderItem = data => (
    <CardStatusItem {...data.item} />
  );

  render() {
    const { filteredRedditData } = this.state;
    return (
      <FlatList
        data={filteredRedditData}
        keyExtractor={this.keyExtractor}
        renderItem={this.renderItem}
      />
    );
  }
}

const mapDispatchToProps = () => ({});

const mapStateToProps = state => ({
  redditData: state.redditData,
});

export default connect(mapStateToProps, mapDispatchToProps)(ApproveList);
