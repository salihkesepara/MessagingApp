import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
  FlatList,
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
} from 'react-native';
import Item from '../components/item';
import status from '../constants/status';

export default class List extends Component {
  _renderItem = data => {
    return <Item item={data.item} user={this.props.user} />;
  };

  spinner = () => {
    return (
      <View style={styles.alignCenter}>
        <ActivityIndicator size="large" />
      </View>
    );
  };

  flatList = () => {
    return (
      <FlatList
        inverted
        style={styles.flatlist}
        data={this.props.messages.list}
        renderItem={this._renderItem}
      />
    );
  };

  errorMessage = () => {
    return (
      <View style={[styles.alignCenter, styles.text]}>
        <Text style={styles.text}>Something Wrong!</Text>
      </View>
    );
  };

  checkStatus = () => {
    switch (this.props.messages.status) {
      case status.SUCCESS:
        return this.flatList();
      case status.FAILURE:
        return this.errorMessage();
      default:
        return this.spinner();
    }
  };

  render() {
    return this.checkStatus();
  }
}

const styles = StyleSheet.create({
  flatlist: {
    flex: 1,
    padding: 10,
  },
  alignCenter: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 22,
  },
});

List.propTypes = {
  messages: PropTypes.object,
  user: PropTypes.object,
};
