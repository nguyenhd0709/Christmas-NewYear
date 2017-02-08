import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  Easing,
  Animated,
  Dimensions
} from 'react-native';
import routes from './routes';
import Confetti from 'react-native-confetti';
var Sound = require('react-native-sound');

const window = Dimensions.get('window');
var SPRING_CONFIG = {
  tension: 2,
  friction: 3
};

class Mainpage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      translate: new Animated.ValueXY(),
      christmasText: true,
      count: 0
    };
  }
  componentDidMount() {
    var whoosh = new Sound('lastchristmas.mp3', Sound.MAIN_BUNDLE, (error) => {
      if (error) {
        console.log('failed to load the sound', error);
      } else { // loaded successfully
        console.log('duration in seconds: ' + whoosh.getDuration() + 'number of channels: ' + whoosh.getNumberOfChannels());
        //whoosh.play(); //playing sound
      }
    });
    if (this._confettiView) {
      this._confettiView.startConfetti();
    };
    this.startAnimation();
    if(this.props.startAnimationAgain === true){
      this.setState({
        count : 0
      })
    }
  }
  startAnimation() {
    Animated.sequence([
      Animated.timing(this.state.translate, {
        ...SPRING_CONFIG,
        duration: 15000,
        toValue: {
          x: -800,
          y: 0
        }
      }),
      Animated.timing(this.state.translate, {
        ...SPRING_CONFIG,
        duration: 0,
        toValue: {
          x: 0,
          y: 0
        }
      })
    ]).start((event) => {
      if (event.finished) {
        this.setState({
          christmasText : !this.state.christmasText,
          count: this.state.count + 1
        });
        if (this.state.count >= 2){
          this.props.navigator.push(routes.NewYear);
        }else {
          this.startAnimation();
        }
      }
    });
  }
  getStyle() {
    return [
      styles.image, {
        transform: this.state.translate.getTranslateTransform()
      }
    ]
  }
  renderText() {
    if(this.state.christmasText === true){
      return (
        <Image style={styles.text} source={require('./images/merry-christmas-text.png')} resizeMode={Image.resizeMode.stretch}/>
      );
    }
    else{
      return (
        <Image style={styles.secondText} source={require('./images/happy-new-year-text.png')} resizeMode={Image.resizeMode.stretch}/>
      );
    }
  }
  renderHouse() {
    if (true) {
      return (<Image style={styles.house} source={require('./images/house.gif')} resizeMode={Image.resizeMode.stretch}/>);
    }
  }
  render() {
    return (
      <Image style={styles.container} source={require('./images/santa-background.jpg')} resizeMode={Image.resizeMode.stretch}>
        <Confetti ref={(node) => this._confettiView = node}/>
        <View style={styles.animation}>
          <Animated.Image style={this.getStyle()} source={require('./images/santa.gif')} resizeMode={Image.resizeMode.stretch}/>
        </View>
        <View style={{alignItems: 'center', marginTop : -10}}>
          {this.renderText()}
        </View>
        <View style={styles.houseContainer}>
          {this.renderHouse()}
          {this.renderHouse()}
          {this.renderHouse()}
          {this.renderHouse()}
          {this.renderHouse()}
          {this.renderHouse()}
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
    justifyContent: 'space-between'
  },
  animation: {
    width: window.width,
    height: 100,
    alignItems: 'flex-end',
    marginLeft: 200
  },
  image: {
    width: 200,
    height: 100
  },
  houseContainer: {
    flexDirection: 'row',
    width: window.width,
    height: 100,
    justifyContent: 'center'
  },
  house: {
    width: 100,
    height: 100
  },
  text: {
    width: 300,
    height: 120
  },
  secondText: {
    width: 500,
    height: 120
  }
})

export default Mainpage;
