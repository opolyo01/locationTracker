'use strict';

var React = require('react-native');
var ListingView = require('./ListingView');

var {
  StyleSheet,
  Component,
  View,
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
    padding: 30,
    marginTop: 65,
    alignItems: 'center'
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
  buttonsContainer:{
    flex:1,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch'
  },
  button: {
    height: 30,
    flex: 0.5,
    backgroundColor: '#48BBEC',
    borderColor: '#48BBEC',
    borderWidth: 1,
    borderRadius: 8,
    marginLeft:20
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
      <View style={styles.container}>
        <View style={styles.flowRight}>
            <TextInput
              style={styles.addInput}
              placeholder='Address'
              value=''
              onChange={this.onAddressTextChanged.bind(this)}/>
            <TextInput
              style={styles.addInput}
              placeholder='City'
              value=''
              onChange={this.onCityTextChanged.bind(this)}/>
            <TextInput
              style={styles.addInput}
              placeholder='State'
              value=''
              onChange={this.onStateTextChanged.bind(this)}/>
          </View>
          {spinner}
          <Text style={styles.description}>{this.state.message}</Text>
          <View style={styles.buttonsContainer}>
              <TouchableHighlight style={styles.button}
                  underlayColor='#99d9f4'
                  onPress={this.onAddPressed.bind(this)}>
                <Text style={styles.buttonText}>ADD</Text>
              </TouchableHighlight>
            </View>
        </View>
    );
  }
}

module.exports = AddListing;
