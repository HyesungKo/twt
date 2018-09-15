import React, { Component } from 'react';
import { View, Picker, ScrollView } from 'react-native';
import firebase from 'firebase';
import { Input, Text, Button } from 'react-native-elements';
import { postGuide } from '../../Data/Data';

class Post extends Component {
  constructor(props) {
    super(props);
    this.post = this.post.bind(this);
    this.state = {
      title: '',
      userName: '',
      category: 'eSports',
      description: '',
      price: '$100',
      placeToMeet: '',
      time: '',
      tags: '',
      location: '',
      language: '',
      
    };
  }

  componentDidMount() {
    firebase.database().ref(`profiles/${firebase.auth().currentUser.uid}`).once('value', snapshot => {
      this.setState({userName: snapshot.val().userName})
    })
  }


  post() {
    postGuide(this.state)
    this.props.navigation.pop()
  }

  render() {
    return (
      <View style={{flex: 1, flexDirection: "column", padding: 10}}>
        <ScrollView>
          <Input
            placeholder="Title"
            value={this.state.title}
            onChangeText={(text) => this.setState({title: text})} />
          <Input
            placeholder="location"
            value={this.state.location}
            onChangeText={(text) => this.setState({location: text})} />
          <Text h4>Category:</Text>
          <Picker
            mode="dropdown"
            selectedValue={this.state.category}
            onValueChange={(itemValue, itemIndex) => this.setState({category: itemValue})}>
            <Picker.Item label="Extreme Sports" value="eSports" />
            <Picker.Item label="Entertainment" value="entertainment" />
            <Picker.Item label="History" value="history" />
            <Picker.Item label="Art" value="art" />
            <Picker.Item label="Night Life" value="nightLife" />
            <Picker.Item label="City Tour" value="cityTour" />
            <Picker.Item label="Food" value="food" />
            <Picker.Item label="Nature" value="nature" />
          </Picker>
          <Input
            placeholder="Description"
            style={{height: 50}}
            value={this.state.description}
            onChangeText={(text) => this.setState({description: text})}
            multiline = {true}/>
          <View style={{flexDirection: "row"}}>
            <Text h4>Price: </Text>
            <Input
              value={this.state.price}
              onChangeText={(text) => this.setState({price: text})} />
          </View>
          <Input
            placeholder="Place to meet"
            value={this.state.placeToMeet}
            onChangeText={(text) => this.setState({placeToMeet: text})} />
            <Input
            placeholder="time"
            value={this.state.time}
            onChangeText={(text) => this.setState({time: text})} />
            <Input
            placeholder="tags"
            value={this.state.tags}
            onChangeText={(text) => this.setState({tags: text})} />
            <Input
            placeholder="language"
            value={this.state.language}
            onChangeText={(text) => this.setState({language: text})} />
          <Button onPress={this.post} title="Post" style={{padding: 10}} />
        </ScrollView>
      </View>
    );
  }
}

export default Post;
