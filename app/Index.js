import React, { Component } from 'react';
import { RootNavigation } from './Router/Router';

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const RootNav = RootNavigation();
    return <RootNav />
    }
}

export default Index;
