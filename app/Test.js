import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
  DrawerLayoutAndroid
} from 'react-native';

import ToggleView from './ToggleView';

export default class Test extends Component {
  render(){
    var navigationView = (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <Text style={{margin: 10, fontSize: 15, textAlign: 'left'}}>I'm in the Drawer!</Text>
    </View>
  );
  return (
    <DrawerLayoutAndroid
      drawerWidth={300}
      drawerPosition={DrawerLayoutAndroid.positions.Left}
      renderNavigationView={() => navigationView}>
      <View style={{backgroundColor: 'red', flex: 1}}>
        <Text style={{marginTop: 300}}>AAA</Text>
        <TextInput/>
      </View>
    </DrawerLayoutAndroid>
  );
  }
}
