import React, { Component } from 'react';
import { View,} from 'react-native';
import { Card, Text, Button } from 'react-native-elements';
import { saveFavorite } from '../../Data/Data';

class GuideDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  saveFavorite = (guideKey) => {
    saveFavorite(guideKey);
  }

  render() {
    const { navigation } = this.props;
    const guide = navigation.getParam('guide');
    console.log(guide.value)
    return (
      <Card
        title={guide.value.title}
        flexDirection="column"
      >
        <Text>Guide by: {guide.value.userName}</Text>
        <Text>Category: {guide.value.category}</Text>
        <Text>Price: {guide.value.price}</Text>
        <Text>Detail</Text>
        <Text>{guide.value.description}</Text>
        <Button
            title="Add to Favorite"
            onPress={() => this.saveFavorite(guide.key)}
        />

      </Card>
    );
  }
}

export default GuideDetail;
