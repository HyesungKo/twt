import React, { Component } from 'react';
import { View, Text, ScrollView, ActivityIndicator } from 'react-native';
import { ListItem, Button } from 'react-native-elements';
import { getFavoriteGuides } from '../../Data/Data';

class Favorite extends Component {
  constructor(props) {
    super(props);
    this.retrieveFavoriteGuides = this.retrieveFavoriteGuides.bind(this);
    this.state = {
      loading: true, 
      favoriteGuides: []
    };
    
  }

  componentDidMount = () => {
    this.retrieveFavoriteGuides()
  };
  

  async retrieveFavoriteGuides() {
    this.setState({
      loading: true
    })
    this.setState({
      favoriteGuides: await getFavoriteGuides()
    })
    this.setState({
      loading: false
    })
    console.log(this.state.favoriteGuides)
  }

  render() {
    if(this.state.loading) {
      return (
        <View style={{alignItems: 'center', paddingTop: 10}}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      )
    }
    return (
      <ScrollView>
        <Button
          title="refresh"
          onPress={this.retrieveFavoriteGuides}
        />
        {
          this.state.favoriteGuides.map((guide, i) => (
            <ListItem
              key={i}
              title={guide.value.title}
              rightSubtitle={guide.value.category}
              subtitle={guide.value.description}
            />
          ))
          }
        
      </ScrollView>
    );
  }
}

export default Favorite;
