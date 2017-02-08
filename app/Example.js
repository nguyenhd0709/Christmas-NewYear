import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  RefreshControl
} from 'react-native';

import Content from './Content';

const NEWS_API_KEY = '489c741a17b74583a227f3b46ba0f90d';

export default class Example extends Component {
  constructor(props){
    super(props);
    this.state = {
      isRefreshing: false,
      source: '',
      news: '',
      author: '',
      images: ''
    };
  }

  componentWillMount() {
    this.fetchData();
    console.log('refreshed');
  }

  fetchData() {
    fetch(`https://newsapi.org/v1/articles?source=the-new-york-times&sortBy=top&apiKey=${NEWS_API_KEY}`)
    .then((response) => response.json())
    .then((responseData) => {
      this.setState({
        source: responseData.source,
        news: responseData.articles,
        isRefreshing: false
      });
    })
    .catch((error) => {
      console.error(error);
    });
  }

  render() {
    return (
      <ScrollView
        style={styles.container}
        refreshControl={
          <RefreshControl
            refreshing={this.state.isRefreshing}
            onRefresh={() => {
              this.setState({isRefreshing: true});
              this.fetchData();
            }}
            tintColor="#ff0000"
            title="Loading..."
            titleColor="#00ff00"
            colors={['#ff0000', '#00ff00', '#0000ff']}
            progressBackgroundColor="#ffffff"
          />
        }
      >
        {Array.apply(null, Array(this.state.news.length)).map(function(item, i) {
          return (
            <Content key={i}
              source={this.state.source}
              author={this.state.news[i].author}
              images={this.state.news[i].urlToImage}
              title={this.state.news[i].title}
              description={this.state.news[i].description}
              url={this.state.news[i].url}
            />
          );
        }, this)}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  author: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
    height: 50
  },
  content: {
    width: window.width,
    height: window.width*3 / 4
  }
})
