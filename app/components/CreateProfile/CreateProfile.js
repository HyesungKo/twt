import React, { Component } from 'react';
import { View, TextInput, StyleSheet, KeyboardAvoidingView, Text, Button } from 'react-native';
import firebase from 'firebase';

class CreateProfile extends Component {
  constructor(props) {
    super(props);
    this.completeProfile = this.completeProfile.bind(this);
    this.state = {
      userName: ''
    };
  }

  completeProfile() {
    firebase.database().ref(`profiles/${firebase.auth().currentUser.uid}`).set({
      userName: this.state.userName,
      email: firebase.auth().currentUser.email
    })
    this.props.navigation.navigate('App')
  }

  render() {
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <View style={styles.loginContainer}>
          <Text style={{fontSize: 20}}> User Name? </Text>
          <TextInput style = {styles.input} 
          autoCapitalize="none" 
          autoCorrect={false} 
          keyboardType='email-address' 
          returnKeyType="go" 
          placeholder='User Name'
          value={this.state.userName}
          onChangeText={(text) => this.setState({userName: text})}
          placeholderTextColor='rgba(225,225,225,0.7)' />
          {this.state.userName &&
            <Button onPress={this.completeProfile} title="Done!" />
          }
          
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: '#2c3e50',
  },
  loginContainer:{
      alignItems: 'center',
      flexGrow: 1,
      justifyContent: 'center'
  },
  input:{
      width: "90%",
      height: 50,
      backgroundColor: 'rgba(225,225,225,0.2)',
      marginBottom: 10,
      marginTop: 10,
      padding: 10,
      color: '#fff'
  }
})

export default CreateProfile;
