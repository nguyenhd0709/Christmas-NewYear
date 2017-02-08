import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  ListView,
  ScrollView,
  Image,
  Text,
  Alert,
  TouchableOpacity,
  PanResponder,
  Animated,
  Dimensions
} from 'react-native';

const window = Dimensions.get('window');

export default class Viewport extends Component {
  constructor(props) {
    super(props);
    this.state = {
      renderImage: true,
      checkImage: true,
      direction: true,
      i: 0,
      image: [
        '100',
        '101',
        '102',
        '103',
        '104',
        '105'
      ],
      imageForShow: '100',
      autoSlide: false
    }
  }
  componentDidMount() {
    if (this.state.autoSlide === true) {
      setInterval(() => {
        this.onPress('next');
      }, 2000);
    }
  }
  onPress(direction) {
    var index = this.state.i;
    if (direction === 'next') {
      this.setState({direction: true})
    } else if (direction === 'prev') {
      this.setState({direction: false})
    }
    this.state.direction
      ? index = index + 1
      : index = index - 1;
    if (index > this.state.image.length - 1) {
      index = 0
    }
    if (index < 0) {
      index = this.state.image.length - 1
    }
    this.setState({i: index, imageForShow: this.state.image[index]})
    alert(index);
  }
  renderImage() {
    const image = `http://localhost:8081/app/images/${this.state.imageForShow}.jpg`;
    if (this.state.renderImage) {
      return (
        <Image
          style={styles.image}
          source={{uri: image}}
          resizeMode={Image.resizeMode.stretch}
        />
      );
    }
  }
  render() {
    return (
      <View style={{
        alignItems: 'center'
      }}>
        <View style={styles.image}>
          {this.renderImage()}
        </View>
        <View style={{
          flexDirection: 'row'
        }}>
          <TouchableOpacity style={styles.button} onPress={this.onPress.bind(this, 'prev')}>
            <Text>
              -
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={this.onPress.bind(this, 'next')}>
            <Text>
              +
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  image: {
    width: window.width,
    height: 200
  },
  button: {
    backgroundColor: 'pink',
    padding: 10,
    alignItems: 'center'
  }
})
