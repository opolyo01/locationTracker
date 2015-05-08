'use strict';

var React = require('react-native');
var {
  StyleSheet,
  View,
  Text,
  Component
} = React;

var styles = StyleSheet.create({
  desc: {
    marginBottom: 20,
    fontSize: 18,
    textAlign: 'center',
    color: '#656565'
  },
  container: {
    marginTop: 65
  },
  heading: {
    backgroundColor: '#F8F8F8',
  },
  separator: {
    height: 1,
    backgroundColor: '#DDDDDD'
  }
});

class ListingView extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      message: '',
      loading: false
    };
  }

  render() {
    var listing = this.props.listing;
    return (
      <View style={styles.container}>
        <View style={styles.heading}>
          <Text style={styles.desc}>{listing.address}</Text>
          <Text style={styles.desc}>{listing.city}</Text>
          <Text style={styles.desc}>{listing.state}</Text>
          <Text style={styles.desc}>{listing.lat}</Text>
          <Text style={styles.desc}>{listing.lng}</Text>
          <View style={styles.separator}/>
        </View>
        <Text style={styles.description}>{this.state.message}</Text>
      </View>
    );
  }
};

module.exports = ListingView;