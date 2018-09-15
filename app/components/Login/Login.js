import React, { Component } from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, ActivityIndicator } from 'react-native';
import { Input, Button } from 'react-native-elements';
import { signInWithEmailAndPassword } from '../../Auth/Auth';
import firebase from 'firebase';
import { Ionicons } from '@expo/vector-icons';

class Login extends Component {

    constructor(props) {
        super(props);
        this.login = this.login.bind(this);
        this.state = {
            email: '',
            password: '',
            loading: false
        };
    }

    componentWillUnmount() {
        this.setState = ({
            email: '',
            password: '',
            loading: false
        });
    }

    login() {
        this.setState({loading: true})
        signInWithEmailAndPassword(this.state.email, this.state.password).then(result => {        
            firebase.database().ref(`/profiles/${result.user.uid}`).once('value').then(snapshot => {
                if(snapshot.val()) {
                    this.props.navigation.navigate('App');
                } else{
                    this.props.navigation.replace('CreateProfile');
                }
            }).catch(e => console.log(e))
        }).catch(e => {
            this.setState = ({
                email: '',
                password: '',
                loading: false
            });
            console.log(e)
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
                <Button
                    title="Login"
                    titleStyle={{ color:"#000", fontWeight: "700" }}
                    buttonStyle={{
                        backgroundColor: "yellow",
                        width: "100%",
                        height: 45,
                        borderColor: "transparent",
                        borderWidth: 0,
                        borderRadius: 5
                    }}
                    containerStyle={{ marginTop: 30 }}
                    onPress={this.login}
                />
                <Button
                    title="Register"
                    titleStyle={{ color:"#000", fontWeight: "700" }}
                    buttonStyle={{
                        backgroundColor: "red",
                        width: "100%",
                        height: 45,
                        borderColor: "transparent",
                        borderWidth: 0,
                        borderRadius: 5
                    }}
                    containerStyle={{ marginTop: 20 }}
                    onPress={() => this.props.navigation.navigate('Register')}
                />
            </View> 
        }
        return (
            <KeyboardAvoidingView behavior="padding" style={styles.container}>
                <View style={styles.loginContainer}>
                    <Text style={{fontSize: 80, marginBottom: 50}}>TWT</Text>
                    <Input
                    style={styles.input}
                    autoCapitalize="none" 
                    autoCorrect={false} 
                    keyboardType='email-address' 
                    returnKeyType="next" 
                    placeholder='Email'
                    borderBottomWidth={0}
                    leftIcon={
                        <Ionicons
                            style={{width: 25, textAlign: "center"}} name="md-mail" size={25} color="#fff"
                        />
                    }
                    value={this.state.email}
                    onChangeText={(text) => this.setState({email: text})}
                    placeholderTextColor='#fff' />

                    <Input
                    style={styles.input}  
                    returnKeyType="go"  
                    placeholder='Password' 
                    placeholderTextColor='#fff'
                    borderBottomWidth={0}
                    // containerStyle = {{borderColor: '#fff',
                    // borderStyle: "solid", borderWidth: 1, borderRadius: 20}} 
                    onChangeText={(text) => this.setState({password: text})}
                    value={this.state.password}
                    leftIcon={
                        <Ionicons
                            style={{width: 25, textAlign: "center"}} name="md-lock" size={25} color="#fff"
                        />
                    }
                    secureTextEntry />
                    {loading}
                </View>
            </KeyboardAvoidingView>
        );
    }
}

export default Login;

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
        height: 50,
        backgroundColor: 'rgba(225,225,225,0.2)',
        marginBottom: 10,
        marginTop: 10,
        padding: 10,
        
    }
})