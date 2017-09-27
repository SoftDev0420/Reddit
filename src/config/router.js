import React from 'react';
import { Button } from 'react-native';
import { StackNavigator } from 'react-navigation';

import Login from '../screens/Login';
import Overview from '../screens/Overview';
import ApproveList from '../screens/ApproveList';

const Root = StackNavigator({
  Login: {
    screen: Login,
    navigationOptions: {
      title: 'Login',
    },
  },
  Overview: {
    screen: Overview,
    navigationOptions: ({ navigation: { navigate } }) => ({
      title: 'Overview',
      headerRight: (
        <Button
          title="Approve List"
          onPress={() => navigate('ApproveList')}
        />
      ),
    }),
  },
  ApproveList: {
    screen: ApproveList,
    navigationOptions: {
      title: 'Approve List',
    },
  },
}, {
});

export default Root;
