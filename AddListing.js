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
  searchInput: {
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

  onSearchTextChanged(event) {
    this.setState({ searchString: event.nativeEvent.text });
  }

  onCancelPressed(){
    this.props.navigator.pop();
  }

  onSearchPressed(){
    //this.props.navigator.pop();
    this.props.onAddListing({'id':4, 'address': '92 N 7th Street', 'city': 'San Jose', 'state': 'CA','lat': 38.7411761, 'lng': -85.8122836, distance:0});
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.flowRight}>
            <TextInput
              style={styles.searchInput}
              placeholder='Address'
              value=''
              onChange={this.onSearchTextChanged.bind(this)}/>
            <TextInput
              style={styles.searchInput}
              placeholder='City'
              value=''
              onChange={this.onSearchTextChanged.bind(this)}/>
            <TextInput
              style={styles.searchInput}
              placeholder='State'
              value=''
              onChange={this.onSearchTextChanged.bind(this)}/>
          </View>
          <View style={styles.buttonsContainer}>
              <TouchableHighlight style={styles.button}
                  underlayColor='#99d9f4'
                  onPress={this.onSearchPressed.bind(this)}>
                <Text style={styles.buttonText}>ADD</Text>
              </TouchableHighlight>
              <TouchableHighlight style={styles.button}
                  underlayColor='#99d9f4'
                  onPress={this.onCancelPressed.bind(this)}>
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableHighlight>
            </View>
        </View>
    );
  }
}

module.exports = AddListing;
