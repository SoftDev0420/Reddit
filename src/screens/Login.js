import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  TextInput,
  Button,
  Alert,
  StyleSheet,
} from 'react-native';

const styles = StyleSheet.create({
  loginView: { flex: 1, paddingTop: 20 },
  textInput: { marginHorizontal: 40, marginTop: 10, backgroundColor: 'white', borderRadius: 5, padding: 10 },
});

class Login extends Component {

  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func,
    }).isRequired,
  }

  constructor(props) {
    super(props);

    this.username = null;
    this.password = null;
  }

  onLogIn = () => {
    const { navigate } = this.props.navigation;
    if (this.username === 'Admin' && this.password === '123') {
      navigate('Overview');
    } else {
      Alert.alert(
        'Reddit',
        'Invalid username or password.',
        [
          { text: 'OK' },
        ],
        { cancelable: false },
      );
    }
  }

  render() {
    return (
      <View style={styles.loginView}>
        <TextInput
          style={styles.textInput}
          placeholder="Username"
          onChangeText={text => (this.username = text)}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Password"
          secureTextEntry
          onChangeText={text => (this.password = text)}
        />
        <Button
          onPress={this.onLogIn}
          title="Log In"
          accessibilityLabel="Learn more about this purple button"
        />
      </View>
    );
  }
}

export default Login;
