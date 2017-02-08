import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    PanResponder,
    Animated,
    Dimensions
} from 'react-native';

export default class DragExample extends Component{
  constructor(props){
    super(props);
    this.state = {
      showDraggable: true,
      visible:true,
      dropZoneValues: null,
      pan: new Animated.ValueXY()
    };
    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder : () => true,
      onPanResponderMove: Animated.event([null,{
        dx : this.state.pan.x,
        dy : this.state.pan.y
      }]),
      onPanResponderRelease: (e, gesture) => {
        if(this.isDropZone(gesture)){
          this.setState({
            showDraggable : false,
            visible: false
          });
          alert('Mission Complete');
        }
        else{
          Animated.spring(
            this.state.pan,
            {
              toValue:{x:0,y:0}
            }
          ).start();
        }
      }
    });
  }
  setVisibleWhenDone(){
    this.setState({
      showDraggable : true,
      visible : true
    });
    Animated.spring(
      this.state.pan,
      {
        toValue:{x:0,y:0}
      }
    ).start();
  }
  renderButton(){
    if(!this.state.visible){
      return(
        <View style = {{justifyContent : 'center', alignItems: 'center'}}>
          <TouchableOpacity style = {{marginTop: Window.height-200, width:170, backgroundColor:'red', padding: 10}} onPress = {this.setVisibleWhenDone.bind(this)}>
            <Text style = {{color:'#fff'}}>
              Click to show drag item
            </Text>
          </TouchableOpacity>
        </View>
      );
    }
  }
  setDropZoneValues(event){
    this.setState({
      dropZoneValues : event.nativeEvent.layout
    });
  }
  isDropZone(gesture){
    var dz = this.state.dropZoneValues;
    return gesture.moveY > dz.y && gesture.moveY < dz.y + dz.height;
  }
  render(){
    return (
      <View style={styles.mainContainer}>
        <View
          onLayout={this.setDropZoneValues.bind(this)}
          style={styles.dropZone}>
          <Text style={styles.text}>Drop me here!</Text>
        </View>

        {this.renderDraggable()}
        {this.renderButton()}
      </View>
    );
  }

  renderDraggable(){
    if(this.state.showDraggable){
      return (
        <View style={styles.draggableContainer}>
          <Animated.View
            {...this.panResponder.panHandlers}
            style={[this.state.pan.getLayout(), styles.circle]}>
            <Text style={styles.text}>Drag me!</Text>
          </Animated.View>
        </View>
      );
    }
  }
}
let CIRCLE_RADIUS = 36;
let Window = Dimensions.get('window');
let styles = StyleSheet.create({
  mainContainer: {
    flex: 1
  },
  dropZone: {
    height: 100,
    backgroundColor:'#2c3e50'
  },
  text: {
    marginTop: 25,
    marginLeft: 5,
    marginRight: 5,
    textAlign: 'center',
    color: '#fff'
  },
  draggableContainer: {
    position: 'absolute',
    top: Window.height/2 - CIRCLE_RADIUS,
    left: Window.width/2 - CIRCLE_RADIUS,
  },
  circle: {
    backgroundColor: '#1abc9c',
    width: CIRCLE_RADIUS*2,
    height: CIRCLE_RADIUS*2,
    borderRadius: CIRCLE_RADIUS
  }
});
