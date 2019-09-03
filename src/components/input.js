import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, TextInput} from 'react-native';

export default class Input extends Component {
  render() {
    return (
      <TextInput
        autoCompleteType="off"
        autoCorrect={false}
        style={styles.textInput}
        onChangeText={this.props.onTextInputChange}
        value={this.props.text}
      />
    );
  }
}

const styles = StyleSheet.create({
  textInput: {
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'gray',
    fontSize: 14,
    paddingHorizontal: 10,
    flex: 1,
    paddingVertical: 10,
    backgroundColor: '#fff',
    height: 35,
  },
});

Input.propTypes = {
  onTextInputChange: PropTypes.func,
  text: PropTypes.string,
};
