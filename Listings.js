'use strict';

var React = require('react-native');
var ListingView = require('./ListingView');

var {
  StyleSheet,
  Component,
  View,
  TouchableHighlight,
  LinkingIOS,
  ListView,
  AsyncStorage,
  Text
} = React;

var styles = StyleSheet.create({
  textContainer: {
    flex: 1,
    flexDirection: 'row'
  },
  separator: {
    height: 1,
    backgroundColor: '#dddddd'
  },
  address: {
    fontSize: 18,
    paddingRight: 10,
    color: '#656565',
    flex:0.4
  },
  distance:{
    flex:0.4,
    marginRight: 10,
    color: '#1464ED'
  },
  rowContainer: {
    flexDirection: 'row',
    padding: 10
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center',
    marginTop: 3
  },
  button: {
    height: 30,
    width:30,
    backgroundColor: '#48BBEC',
    borderColor: '#48BBEC',
    borderWidth: 1,
    borderRadius: 8,
    marginLeft: 5
  }
});


class Listings extends Component{
  
  constructor(props){
    super(props);
    //this.deleteAll();
    var ds = new ListView.DataSource(
      {rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {dataSource: ds.cloneWithRows(props.listings)};
  }

  rowPressed(id) {
    var listing = this.props.listings
      .filter(prop => prop.id === id)[0];

    navigator.geolocation.clearWatch(this.props.watchID);
    this.props.navigator.push({
      title: 'Listing',
      component: ListingView,
      passProps: {listing: listing}
    });

  }

  componentWillReceiveProps(nextProps){
    this.state = {dataSource: this.state.dataSource.cloneWithRows(nextProps.listings)};
  }

  deleteAll(){
    AsyncStorage.removeItem('listings')
      .then(() => {
        this.state = {dataSource: this.state.dataSource.cloneWithRows([])};
      })
      .done();
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
        LinkingIOS.openURL(url);
      }
    });
  }

  deleteListing(id){
    console.log(id);
    this.props.onDeleteListing(id);
  }

  renderRow(rowData, sectionID, rowID) {
    return (
      <TouchableHighlight onPress={() => this.onLocationPressed(rowData.lat, rowData.lng)}
          underlayColor='#dddddd'>
        <View>
          <View style={styles.rowContainer}>
            <View  style={styles.textContainer}>
              <Text style={styles.address} >{rowData.address} {rowData.city}</Text>
              <Text style={styles.distance} numberOfLines={1}>{rowData.distance} mi</Text>
              <TouchableHighlight style={styles.button}
                  underlayColor='#99d9f4'
                  onPress={this.deleteListing.bind(this, rowData.id)}>
                <Text style={styles.buttonText}>-</Text>
              </TouchableHighlight>
              <TouchableHighlight style={styles.button}
                  underlayColor='#99d9f4'
                  onPress={this.rowPressed.bind(this, rowData.id)}>
                <Text style={styles.buttonText}>i</Text>
              </TouchableHighlight>
            </View>
          </View>
          <View style={styles.separator}/>
        </View>
      </TouchableHighlight>
    );
  }

  render() {
    return (
      <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderRow.bind(this)}/>
    );
  }
}

module.exports = Listings;
