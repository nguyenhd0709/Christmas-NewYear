import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  Animated
} from 'react-native';
import routes from './routes';

const window = Dimensions.get('window');
var SPRING_CONFIG = {
  tension: 2,
  friction: 3
};

export default class NewYear extends Component {
  constructor(props){
    super(props);
    this.state = {
      translate1 : new Animated.ValueXY(),
      translate2 : new Animated.ValueXY(),
      count : 0
    }
  }
  componentDidMount(){
    this.startAnimation();
  }
  startAnimation(){
    Animated.sequence([
      Animated.timing(this.state.translate1, {
        ...SPRING_CONFIG,
        duration: 10000,
        toValue: {
          x: 0,
          y: 250
        }
      }),
      Animated.timing(this.state.translate2, {
        ...SPRING_CONFIG,
        duration: 10000,
        toValue: {
          x: 0,
          y: 250
        }
      }),
      Animated.timing(this.state.translate1, {
        ...SPRING_CONFIG,
        duration: 0,
        toValue: {
          x: 0,
          y: 0
        }
      }),
      Animated.timing(this.state.translate2, {
        ...SPRING_CONFIG,
        duration: 0,
        toValue: {
          x: 0,
          y: 0
        }
      })
    ]).start((event) => {
      if(event.finished){
        this.setState({
          count: this.state.count + 1
        });
        if (this.state.count >= 2){
          this.props.navigator.replace(routes.Santa(true));
        }else {
          this.startAnimation();
        }
      }
    });
  }
  getStyle(image){
    return [
      styles.image, {
        transform: image.getTranslateTransform()
      }
    ]
  }
  render(){
    return(
      <Image
        style={styles.container}
        source={require('./images/spring.jpg')} resizeMode={Image.resizeMode.stretch}>
        <View style={styles.animation}>
          <Image style={styles.firework}
            source={require('./images/phao.gif')} resizeMode={Image.resizeMode.stretch}
          />
          <Animated.Image
            style={this.getStyle(this.state.translate1)} source={require('./images/caudoitet.png')} resizeMode={Image.resizeMode.stretch}
          />
          <Animated.Image
            style={this.getStyle(this.state.translate2)} source={require('./images/caudoitet.png')} resizeMode={Image.resizeMode.stretch}
          />
          <Image style={styles.firework}
            source={require('./images/phao.gif')} resizeMode={Image.resizeMode.stretch}
          />
        </View>
      </Image>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: null,
    height: null,
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  animation: {
    width: window.width - 100,
    height: 200,
    alignItems: 'center',
    marginTop: -200,
    justifyContent: 'space-between',
    flexDirection: 'row'
  },
  image: {
    width: 80,
    height: 220
  },
  firework: {
    width: 100,
    height: 150,
    marginTop: 550
  }
})
