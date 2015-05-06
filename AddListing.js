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

  onSearchPressed(){
    console.log('pressed');
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
            <TouchableHighlight style={styles.button}
                underlayColor='#99d9f4'
                onPress={this.onSearchPressed.bind(this)}>
              <Text style={styles.buttonText}>Go</Text>
            </TouchableHighlight>
          </View>
        </View>
    );
  }
}

module.exports = AddListing;
