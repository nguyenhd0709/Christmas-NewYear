import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  WebView,
  Modal
} from 'react-native';

const window = Dimensions.get('window');

export default class Content extends Component {
  constructor(props){
    super(props);
    this.state = {
      modalVisible: false
    }
  }

  openWebView() {
    this.setState({
      modalVisible : true
    })
  }

  render(){
    const source = this.props.source.toUpperCase();
    return(
      <View style= {styles.container}>
        <View style= {styles.author}>
          <TouchableOpacity onPress = {() => console.log('pressed')}>
            <Text style={{fontSize: 20}}>
              {source}
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress = {this.openWebView.bind(this)}>
          <Image style= {styles.content}
                source = {{uri : this.props.images}}
                resizeMode={Image.resizeMode.stretch}
          />
        </TouchableOpacity>
        <Text style= {{textAlign : 'center', marginTop: 10, fontWeight: 'bold'}}>
          {this.props.title}
        </Text>
        <Text style= {{textAlign : 'center', marginTop: 10, fontWeight: 'bold'}}>
          * * * * * *
        </Text>
        <Text style= {{marginLeft: 10, marginTop: 10, fontStyle: 'italic', fontSize: 12}}>
          {this.props.description}
        </Text>
        <Text style= {{textAlign: 'right', margin: 10, fontWeight: 'bold', fontSize: 10}}>
          {this.props.author}
        </Text>
        <Modal
          animationType={"fade"}
          style={{alignItems:'center', justifyContent:'center'}}
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => this.setState({ modalVisible: false })}
        >
          <View style={{ flex: 1}}>
            <WebView
              source={{uri: this.props.url}}
            />
          </View>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container : {
    paddingTop: 10,
    paddingBottom: 20,
    borderBottomWidth : 1,
    borderBottomColor : '#000000',
  },
  author: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
    marginBottom: 10
  },
  content: {
    width: window.width,
    height: window.width /2
  }
})
