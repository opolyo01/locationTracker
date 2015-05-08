'use strict';

var React = require('react-native');
var ListingView = require('./ListingView');

var {
  StyleSheet,
  Component,
  View,
  TouchableHighlight,
  TextInput,
  Text
} = React;

var styles = StyleSheet.create({
  description: {
    marginBottom: 20,
    fontSize: 18,
    textAlign: 'center',
    color: '#656565'
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


class AddListing extends Component{
  
  constructor(props){
    super(props);
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
    this.props.onAddListing({
      'address': this.state.addressString,
      'city': this.state.cityString,
      'state': this.state.stateString,
      'lat': 38.7411761,
      'lng': -85.8122836,
      'distance': 0
    });
  }

  render() {
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
