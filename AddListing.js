'use strict';

var React = require('react-native');
var ListingView = require('./ListingView');

var {
  StyleSheet,
  Component,
  View,
  ScrollView,
  TouchableHighlight,
  TextInput,
  ActivityIndicatorIOS,
  Text
} = React;

var styles = StyleSheet.create({
  description: {
    marginBottom: 20,
    fontSize: 18,
    textAlign: 'center',
    color: 'red'
  },
  container: {
    flex: 1,
    margin: 20
  },
  flowRight: {
    flexDirection: 'column',
    alignItems: 'center',
    alignSelf: 'stretch'
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center',
    marginTop: 3
  },
  button: {
    height: 30,
    flex: 0.5,
    backgroundColor: '#48BBEC',
    borderColor: '#48BBEC',
    borderWidth: 1,
    borderRadius: 8,
    margin:20
  },
  addInput: {
    height: 36,
    padding: 4,
    marginRight: 5,
    marginBottom: 10,
    flex: 4,
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#48BBEC',
    borderRadius: 8,
    color: '#48BBEC'
  }
});

function urlForQueryAndPage(address) {
  var data = {
      sensor: 'false',
      address: address
  };

  var querystring = Object.keys(data)
    .map(key => key + '=' + encodeURIComponent(data[key]))
    .join('&');
  return 'http://maps.google.com/maps/api/geocode/json?' + querystring;
}

class AddListing extends Component{
  
  constructor(props){
    super(props);
    this.state = {
      addressString: '',
      cityString: '',
      stateString: '',
      isLoading: false,
      message: ''
    };
  }

  onAddressTextChanged(event) {
    this.setState({ addressString: event.nativeEvent.text });
  }

  onCityTextChanged(event) {
    this.setState({ cityString: event.nativeEvent.text });
  }

  onStateTextChanged(event) {
    this.setState({ stateString: event.nativeEvent.text });
  }

  onCancelPressed(){
    this.props.navigator.pop();
  }

  setCurrentPressed(){
    var query = 'http://maps.google.com/maps/api/geocode/json?latlng=' + 
        this.props.lat+','+this.props.lng;
    fetch(query)
      .then(response => response.json())
      .then(json => {
        var address = json.results[0].formatted_address;
        var arr = address.split(',');
        this.setState({
          addressString: arr[0],
          cityString: arr[1].trim(),
          stateString: arr[2].trim().split(' ')[0],
        });
      })
      .catch(error => {
        this.setState({
          addressString: '',
          cityString: '',
          stateString: '',
        });
        console.error(error);
      });
  }

  onAddPressed(){
    this.setState({ isLoading: true, message: '' });
    var queryAddress = this.state.addressString + 
              this.state.cityString + this.state.stateString;
    var query = urlForQueryAndPage(queryAddress);

    fetch(query)
      .then(response => response.json())
      .then(json => {
        var lat = json.results[0].geometry.location.lat;
        var lng = json.results[0].geometry.location.lng;

        this.props.onAddListing({
          'address': this.state.addressString,
          'city': this.state.cityString,
          'state': this.state.stateString,
          'lat': lat,
          'lng': lng
        });
      })
      .catch(error => {
        console.error(error);
        this.setState({
          isLoading: false,
          message: 'Invalid Address Entered '
        });
      });
  }

  render() {
    var spinner = this.state.isLoading ?
      ( <ActivityIndicatorIOS
          hidden='true'
          size='large'/> ) :
      ( <View/>);
    
    return (
      <ScrollView style={styles.container}>
        <View style={styles.flowRight}>
            <TextInput
              style={styles.addInput}
              placeholder='Address'
              value={this.state.addressString}
              onChange={this.onAddressTextChanged.bind(this)}/>
            <TextInput
              style={styles.addInput}
              placeholder='City'
              value={this.state.cityString}
              onChange={this.onCityTextChanged.bind(this)}/>
            <TextInput
              style={styles.addInput}
              placeholder='State'
              value={this.state.stateString}
              onChange={this.onStateTextChanged.bind(this)}/>
          </View>
          {spinner}
          <Text style={styles.description}>{this.state.message}</Text>
          <TouchableHighlight style={styles.button}
                underlayColor='#99d9f4'
                onPress={this.onAddPressed.bind(this)}>
              <Text style={styles.buttonText}>ADD</Text>
            </TouchableHighlight>
            <TouchableHighlight style={styles.button}
                  underlayColor='#99d9f4'
                  onPress={this.setCurrentPressed.bind(this)}>
                <Text style={styles.buttonText}>Set Current Address</Text>
            </TouchableHighlight>
        </ScrollView>
    );
  }
}

module.exports = AddListing;
