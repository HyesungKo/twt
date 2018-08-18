import React from 'react';
import firebase from 'firebase';
import Index from './app/Index';
import { firebaseConfig } from './firebaseConfig';
const firebaseApp = firebase.initializeApp(firebaseConfig)

export default class App extends React.Component {
  render() {
    return (
      <Index />
    );
  }
}