import React, { Component } from 'react';
import { signUpWithEmailAndPassword, signInWithEmailAndPassword } from '../../Auth/Auth';
import { Ionicons } from '@expo/vector-icons';
import { Text, View, TextInput, Button, StyleSheet, KeyboardAvoidingView, ActivityIndicator, TouchableOpacity } from 'react-native';

class Register extends Component {
  constructor(props) {
    super(props);
    this.register = this.register.bind(this);
    this.state = {
      email: '',
      password: '',
      confirmPassword: '',
      loading: false
    };
  }

  componentWillUnmount() {
    this.setState({
      email: '',
      password: '',
      confirmPassword: '',
      loading: false
    });
  }

  register() {
    this.setState({loading: true})
    signUpWithEmailAndPassword(this.state.email, this.state.password).then(result => {
      signInWithEmailAndPassword(this.state.email, this.state.password).then(result => {
        this.props.navigation.replace('CreateProfile');
      }).catch(e => {
        this.setState({
          email: '',
          password: '',
          confirmPassword: '',
          loading: false
        });
        console.log(e)
      })
    }).catch(e => {
      this.setState({
        email: '',
        password: '',
        confirmPassword: '',
        loading: false
      });
      console.log(e);
    })    
  }

  render() {
    let loading
    if(this.state.loading){
        loading = <View style={{alignItems: 'center', paddingTop: 10}}>
            <ActivityIndicator size="large" color="#0000ff" />
            </View>
    } else {
        loading = <View>
            { this.email !== '' && this.state.password !== '' && this.state.password === this.state.confirmPassword &&
            <Button onPress={this.register} color="red" title="Register" />
          }
        </View> 
    }
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <TouchableOpacity style={{margin: 20}} onPress={() => this.props.navigation.goBack()}>
        <Ionicons name="md-arrow-back" size={30} />
      </TouchableOpacity>
        <View style={styles.loginContainer}>
          <Text>Create an account with email</Text> 
          <TextInput style = {styles.input} 
            autoCapitalize="none" 
            autoCorrect={false} 
            keyboardType='email-address' 
            returnKeyType="next" 
            placeholder='Email'
            value={this.state.email}
            onChangeText={(text) => this.setState({email: text})}
            placeholderTextColor='rgba(225,225,225,0.7)' />

          <TextInput style = {styles.input}   
            returnKeyType="next"  
            placeholder='Password' 
            value={this.state.password}
            placeholderTextColor='rgba(225,225,225,0.7)' 
            onChangeText={(text) => this.setState({password: text})}
            secureTextEntry />

          <TextInput style = {styles.input}   
            returnKeyType="go"  
            placeholder='Confirm Password' 
            placeholderTextColor='rgba(225,225,225,0.7)'
            value={this.state.confirmPassword} 
            onChangeText={(text) => this.setState({confirmPassword: text})}
            secureTextEntry />
            {loading}
        </View>
      </KeyboardAvoidingView>
    );
  }
}

export default Register;

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: '#2c3e50'
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