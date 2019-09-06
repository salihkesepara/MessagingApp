import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {AsyncStorage, Text, StyleSheet, Platform} from 'react-native';
import {Header, Button, Left, Icon, Body, Title, Right} from 'native-base';
import firebase from '../firebase';

export default class Home extends Component {
  static navigationOptions = {
    header: null,
  };

  _signOutAsync = async () => {
    await AsyncStorage.clear();
    firebase.auth().signOut()
    this.props.navigation.navigate('Auth');
  };

  render() {
    return (
      <Header style={styles.header}>
        <Left>
          <Button transparent onPress={this._signOutAsync}>
            <Icon name="arrow-back" style={styles.icon} />
          </Button>
        </Left>
        <Body>
          <Text style={styles.title}>{this.props.title}</Text>
        </Body>
        <Right />
      </Header>
    );
  }
}

Home.propTypes = {
  navigation: PropTypes.object,
  title: PropTypes.title,
};

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    color: '#fff',
  },
  header: {
    backgroundColor: '#0a68ff',
  },
  icon: {
    color: '#fff',
  }
})