import React, { Component } from 'react';
import {
  View,
  Animated,
  StyleSheet
} from 'react-native';

export default class ToggleView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      height: 0,
      heightAnim: new Animated.Value(0),
      fadeAnim: new Animated.Value(1)
    };
  }

  componentDidUpdate(){
    const { onEndAnimated, visible } = this.props;
    Animated.parallel([
      Animated.timing(this.state.heightAnim, {
        toValue: visible ? this.state.height : 0,
        duration: this.props.duration || 200
      }),
      Animated.timing(this.state.fadeAnim, {
        toValue: visible ? 1 : 0,
        duration: this.props.duration || 100
      })
    ]).start(onEndAnimated && onEndAnimated(visible));
  }

  render() {

    return (
      <Animated.View style={{height: this.state.heightAnim, opacity: this.state.fadeAnim, overflow: 'scroll'}}>
        <View
          collapsable={false}
          onLayout={(e) => {
            if(this.state.height > 0){
                return;
            }
            this.setState({height: e.nativeEvent.layout.height});
          }}
          style={this.props.style}
        >
          {this.props.children}
        </View>
      </Animated.View>
    )
  }
};
