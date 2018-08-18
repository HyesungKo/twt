import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import firebase from 'firebase';


class SplashScreen extends Component {
    constructor(props) {
        super(props);
        this.signedIn();
    }

    signedIn = () => {
        firebase.auth().onAuthStateChanged(user => {
            if(user) {
                firebase.database().ref(`/profiles/${user.uid}`).once('value').then(snapshot => {
                if(snapshot.val()) {
                    this.props.navigation.navigate('App')
                } else {
                    this.props.navigation.navigate('Auth')
                }
                }).catch(e => {
                    this.props.navigation.navigate('Auth')          
                console.log(e)
                })
            } else {
                this.props.navigation.navigate('Auth')          
            }
        })
    };

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.splashContainer}>
                    <Text style={{fontSize: 80, marginBottom: 50}}> TWT </Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#2c3e50',
    },
    splashContainer:{
        alignItems: 'center',
        flexGrow: 1,
        justifyContent: 'center'
    },
})

export default SplashScreen;
