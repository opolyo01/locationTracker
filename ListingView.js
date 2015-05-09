'use strict';

var React = require('react-native');
var {
  StyleSheet,
  TouchableHighlight,
  LinkingIOS,
  ScrollView,
  Text,
  Component
} = React;

var styles = StyleSheet.create({
  desc: { 
    fontSize: 18,
    textAlign: 'center',
    color: '#656565'
  },
  container: {
    flex:1,
    marginTop: 20
  },
  buttonText: {
    fontSize: 14,
    color: 'white',
    alignSelf: 'center',
    marginTop: 3
  },
  button: {
    height: 30,
    backgroundColor: '#48BBEC',
    borderColor: '#48BBEC',
    borderWidth: 1,
    borderRadius: 8,
    marginLeft:20,
    marginRight: 20,
    marginTop: 20
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

  onLocationPressed(lat, lng){
    console.log(lat, lng);
    //var url = 'comgooglemaps://?center=37.374082,-122.062983';
    var url = `http://maps.google.com/maps?daddr=${lat},${lng}&saddr=${this.props.lat},${this.props.lng}`;
    LinkingIOS.canOpenURL(url, (supported) => {
      if (!supported) {
        AlertIOS.alert('Please install google maps');
      } 
      else {
        LinkingIOS.openURL(url);
      }
    });
  }

  deleteListing(id){
    console.log(id);
    this.props.navigator.pop();
    this.props.onDeleteListing(id);
  }

  render() {
    var listing = this.props.listing;
    return (
      <ScrollView style={styles.container}>
        <Text style={styles.desc}>{listing.address}</Text>
        <Text style={styles.desc}>{listing.city}</Text>
        <Text style={styles.desc}>{listing.state}</Text>
        <Text style={styles.desc}>{listing.lat}</Text>
        <Text style={styles.desc}>{listing.lng}</Text>
        <TouchableHighlight style={styles.button}
            underlayColor='#99d9f4'
            onPress={this.deleteListing.bind(this, listing.id)}>
          <Text style={styles.buttonText}>Delete Location</Text>
        </TouchableHighlight>
        
        <TouchableHighlight style={styles.button}
            underlayColor='#99d9f4'
            onPress={this.onLocationPressed.bind(this, listing.lat, listing.lng)}>
          <Text style={styles.buttonText}>Open Direction</Text>
        </TouchableHighlight>
        <Text style={styles.description}>{this.state.message}</Text>
      </ScrollView>
    );
  }
};

module.exports = ListingView;