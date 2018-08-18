import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';
import firebase from 'firebase'

class Profile extends Component {
  constructor(props) {
    super(props);
    this.signOut = this.signOut.bind(this);
    this.state = {
      profile: {}
    }
  }
  
  componentDidMount() {
    firebase.database().ref(`profiles/${firebase.auth().currentUser.uid}`).once('value', snapshot => {
      this.setState({
        profile: snapshot.val()
      })
    })
  }

  signOut() {
    firebase.auth().signOut();
  }

  render() {
    return (
      <View style={{flex: 1, margin: 10}}>
        <Text>Email: {this.state.profile.email}</Text>
        <Text>User Name: {this.state.profile.userName}</Text>
        <Button title="Post Guide" onPress={() => this.props.navigation.navigate('Post')} />
        <Button title="Sign Out" onPress={this.signOut} />
      </View>
    );
  }
}

export default Profile;
