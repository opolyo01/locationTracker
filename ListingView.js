'use strict';

var React = require('react-native');
var {
  StyleSheet,
  View,
  Text,
  AlertIOS,
  TouchableHighlight,
  LinkingIOS,
  Component
} = React;

var styles = StyleSheet.create({
  desc: {
    marginBottom: 20,
    fontSize: 18,
    textAlign: 'center',
    color: '#656565'
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },
  button: {
    height: 36,
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#48BBEC',
    borderColor: '#48BBEC',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
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
  onLocationPressed(lat, lng){
    console.log(lat, lng);
    //var url = 'comgooglemaps://?center=37.374082,-122.062983';
    var url = `http://maps.google.com/maps?center=${lat},${lng}`;
    LinkingIOS.canOpenURL(url, (supported) => {
      if (!supported) {
        AlertIOS.alert('Can\'t handle url: ' + url);
      } 
      else {
        //AlertIOS.alert(url);
        LinkingIOS.openURL(url);
      }
    });
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
        <TouchableHighlight style={styles.button}
            onPress={this.onLocationPressed.bind(this, listing.lat, listing.lng)}
            underlayColor='#99d9f4'>
          <Text style={styles.buttonText}>Open Google Map</Text>
        </TouchableHighlight>
        <Text style={styles.description}>{this.state.message}</Text>
      </View>
    );
  }
};

module.exports = ListingView;