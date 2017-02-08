import React, { Component } from 'react';
import {
  Navigator,
  AppRegistry,
  View,
  Text,
} from 'react-native';
import routes from './app/routes';

export default class AwesomeProject extends Component {
  renderScene(route, navigator) {
    this.navigator = navigator;
    return React.createElement(route.component, {
      ...route.props,
      navigator
    });
  }

  render() {
    return (
      <Navigator
        initialRoute={routes.Test}
        renderScene={this.renderScene.bind(this)}
        configureScene={() => ({
          ...Navigator.SceneConfigs.PushFromRight,
          gestures: null
        })}
      />
    );
  }
}

AppRegistry.registerComponent('DragAndDrop', () => AwesomeProject);
