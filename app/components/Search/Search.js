import React, { Component } from 'react';
import { View, ActivityIndicator, ScrollView } from 'react-native';
import { SearchBar, ListItem, Button } from 'react-native-elements';
import { getGuide } from '../../Data/Data';

class Search extends Component {
  constructor(props) {
    super(props);
    this.retrieveGuides = this.retrieveGuides.bind(this);
    this.state = {
      loading: true,
      guides: []
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
          placeholder="Search"
        />
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
