import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, StyleSheet, KeyboardAvoidingView} from 'react-native';
import SendButton from '../components/sendButton';
import Input from '../components/input';
import firebase from '../firebase';

export default class InputPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
    };
  }

  _onInputChange = text => {
    this.setState({text});
  };

  _onSendButtonPress = () => {
    const uuidv4 = require('uuid/v4');
    const newMessage = {
      id: uuidv4(),
      user: this.props.user,
      text: this.state.text,
      timestamp: 0,
    };

    firebase
      .database()
      .ref('messages/')
      .push(newMessage, err => {
        err
          ? console.log('Firebase push Failure: ', err)
          : console.log('Firebse push success!');
      });
    this.setState({text: ''});
  };

  render() {
    return (
      <KeyboardAvoidingView behavior="padding">
        <View style={styles.inputBar}>
          <Input text={this.state.text} onTextInputChange={this._onInputChange} />
          <SendButton
            disabled={!this.state.text}
            onPress={this._onSendButtonPress} />
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  inputBar: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: '#dadfea',
    paddingHorizontal: 5,
    paddingVertical: 10,
  },
});

InputPanel.propTypes = {
  addNewMessage: PropTypes.func,
  user: PropTypes.string,
};
