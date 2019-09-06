import React, {Component} from 'react';
import firebase from '../firebase';
import status from '../constants/status';
import {
  AsyncStorage,
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  ImageBackground,
} from 'react-native';
import backgroundImg from '../assets/images/background.jpg';

const MARGIN = 40;
const NICKNAME = 'Nickname';
const ENTER_NICKNAME = 'Enter Nickname';
const LOGIN = 'LOGIN';
const minNickLenght = 2;

const SIGN_ERROR = 'Nickname is too short';

export default class SignUp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      nickname: '',
      status: null,
    };
  }

  static navigationOptions = {
    header: null,
  };

  isNickNameValid = () => {
    return this.state.nickname.length > minNickLenght;
  };

  checkNickName = signUpNow => {
    if (this.isNickNameValid()) {
      signUpNow();
    } else {
      alert(SIGN_ERROR);
    }
  };

  _onPress = () => {
    const signUpNow = () => {
      this.setState({status: status.PENDING});
      firebase
        .auth()
        .signInAnonymously()
        .then(
          result => {
            const userId = result.user.uid;
            const user = {
              id: userId,
              name: this.state.nickname,
              avatar: '',
            };
            this.setState({status: status.SUCCESS});
            AsyncStorage.setItem('user', JSON.stringify(user)).then(() => {
              this.props.navigation.navigate('App');
            });
          },
          (err) => {
            console.log('Login Failure: ', err);
            this.setState({status: status.FAILURE});
          },
        );
    };

    this.checkNickName(signUpNow);
  };

  _onChangeText = nickname => {
    this.setState({nickname});
  };

  _onChangeText = nickname => {
    this.setState({nickname});
  };

  render() {
    const isPressed = this.state.status === status.PENDING;

    return (
      <ImageBackground source={backgroundImg} style={styles.container}>
        <Text style={styles.text}>{ENTER_NICKNAME}</Text>
        <TextInput
          style={styles.input}
          placeholder={NICKNAME}
          onChangeText={this._onChangeText}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={this._onPress}
          disabled={isPressed}>
          {isPressed ? (
            <ActivityIndicator size="small" color="#0000ff" />
          ) : (
            <Text style={styles.buttonText}>{LOGIN}</Text>
          )}
        </TouchableOpacity>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  text: {
    fontSize: 25,
    color: '#fff',
  },
  buttonText: {
    fontSize: 18,
  },
  input: {
    borderColor: 'gray',
    backgroundColor: '#fff',
    alignSelf: 'stretch',
    borderWidth: 1,
    marginBottom: 20,
    marginTop: 20,
    fontSize: 20,
    padding: 10,
    borderRadius: 5,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f8f8f8',
    width: 100,
    height: MARGIN,
    borderRadius: 5,
  },
});
