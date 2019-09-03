import React, {Component} from 'react';
import Header from '../components/header';
import InputPanel from '../components/inputPanel';
import List from '../components/list';
import {AsyncStorage} from 'react-native';
import {Container} from 'native-base';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as messages from '../models/messages';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
    };
  }

  static navigationOptions = {
    header: null,
  };

  componentDidMount() {
    AsyncStorage.getItem('user').then(user => {
      this.setState({user: JSON.parse(user)});
      this.props.actions.getMessages();
    });
  }

  render() {
    return (
      <Container>
        <Header
          navigation={this.props.navigation}
          title={this.state.user.name}
        />
        <List messages={this.props.messages} user={this.state.user} />
        <InputPanel user={this.state.user} />
      </Container>
    );
  }
}

function mapStateToProps(state) {
  return {
    messages: state.messages,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(messages.actions, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Home);
