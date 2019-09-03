import React, {Component} from 'react';
import {Text, StyleSheet, View} from 'react-native';
import {Avatar} from 'react-native-elements';
import PropTypes from 'prop-types';

export default class Item extends Component {
  showAvatar = item => {
    return item.user.avatarUrl ? (
      <Avatar source={{uri: item.user.avatarUrl}} size="medium" rounded />
    ) : (
      <Avatar
        icon={{name: 'user', type: 'font-awesome'}}
        size="medium"
        rounded
      />
    );
  };

  render() {
    const isMyMessage = this.props.user.name === this.props.item.user.name;
    const textContainerExtra = isMyMessage
      ? styles.textContainerRight
      : styles.textContainerLeft;

    const textExtra = isMyMessage ? styles.textRight : styles.textLeft;

    return (
      <View style={styles.container}>
        {!isMyMessage ? this.showAvatar(this.props.item) : null}
        <View style={[styles.textContainer, textContainerExtra]}>
          {isMyMessage ? null : (
            <Text style={[styles.sender]}>{this.props.item.user.name}</Text>
          )}
          <Text style={(styles.message, textExtra)}>
            {this.props.item.text}
          </Text>
        </View>
        {isMyMessage ? this.showAvatar(this.props.item) : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 10,
  },
  textContainer: {
    flexDirection: 'column',
    marginLeft: 10,
    marginRight: 10,
    flex: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  textContainerLeft: {
    alignItems: 'flex-start',
    backgroundColor: '#f5f5f5',
  },
  textContainerRight: {
    alignItems: 'flex-end',
    backgroundColor: '#008efa',
  },
  message: {},
  sender: {
    fontWeight: 'bold',
    paddingRight: 10,
    fontSize: 18,
  },
  textRight: {
    color: '#fff',
  },
  textLeft: {
    color: '#000',
  },
});

Item.propTypes = {
  item: PropTypes.object,
  user: PropTypes.object,
};
