import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Text, StyleSheet, TouchableHighlight} from 'react-native';

const SEND = 'SEND';

export default class SendButton extends Component {
  _onPress = () => {
    this.props.onPress();
  };

  render() {
    const checkForDisabled = this.props.disabled
      ? styles.disabledButton
      : styles.enabledButton;

    return (
      <TouchableHighlight
        style={[styles.sendButton, checkForDisabled]}
        disabled={this.props.disabled}
        onPress={this._onPress}>
        <Text style={styles.buttonText}>{SEND}</Text>
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  sendButton: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5,
    marginLeft: 5,
    height: 35,
  },
  buttonText: {
    color: '#fff',
  },
  enabledButton: {
    backgroundColor: '#0a68ff',
  },
  disabledButton: {
    backgroundColor: '#a6a6a6',
  },
});

SendButton.propTypes = {
  disabled: PropTypes.bool,
  onPress: PropTypes.func,
};
