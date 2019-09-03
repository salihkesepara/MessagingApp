import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {AsyncStorage} from 'react-native';
import {Header, Button, Left, Icon, Body, Title, Right} from 'native-base';

export default class Home extends Component {
  static navigationOptions = {
    header: null,
  };

  _signOutAsync = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate('Auth');
  };

  render() {
    return (
      <Header>
        <Left>
          <Button transparent onPress={this._signOutAsync}>
            <Icon name="arrow-back" />
          </Button>
        </Left>
        <Body>
          <Title>{this.props.title}</Title>
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
