import React, { Component } from 'react';
import { View, ActivityIndicator, ScrollView } from 'react-native';
import { ListItem, Button, SearchBar } from 'react-native-elements';
import { getGuide } from '../../Data/Data';
import { Ionicons } from '@expo/vector-icons';

class Search extends Component {
  constructor(props) {
    super(props);
    this.retrieveGuides = this.retrieveGuides.bind(this);
    this.filterByLocation = this.filterByLocation.bind(this);
    this.state = {
      loading: true,
      guides: [],
      location: ''
    };
  }

  componentDidMount = () => {
    this.retrieveGuides()
  };
  

  async retrieveGuides() {
    this.setState({
      loading: true
    })
    this.setState({
      guides: await getGuide()
    })
    this.setState({
      loading: false
    })
  }

  filterByLocation(text) {
    this.setState({location: text});
  }

  render() {
    if(this.state.loading){
      return (
        <View style={{alignItems: 'center', paddingTop: 10}}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      )
    }

    return (
      <ScrollView>
        <SearchBar
          lightTheme
          searchIcon={<Ionicons
                style={{width: 25, textAlign: "center"}} name="md-search" size={25} color="red"
            />}
          onChangeText={(text) => this.filterByLocation(text)}
          // onClear={someMethod}
          placeholder='Location' />
        <Button
          title="refresh"
          onPress={this.retrieveGuides}
        />
        <View>
          {
            this.state.guides.map((guide, i) => (
              <ListItem
                key={i}
                title={guide.value.title}
                rightSubtitle={guide.value.category}
                subtitle={guide.value.description}
                onPress={() => this.props.navigation.navigate('GuideDetail', {
                  guide: guide
                })}
              />
            ))
          }
        </View>
        
      </ScrollView>
    );
  }
}

export default Search;
