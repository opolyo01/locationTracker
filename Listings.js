'use strict';

var React = require('react-native');
var ListingView = require('./ListingView');

var {
  StyleSheet,
  Component,
  View,
  TouchableHighlight,
  ListView,
  AsyncStorage,
  Text
} = React;

var styles = StyleSheet.create({
  container: {
    flex: 1
  },
  rowContainer: {
    flexDirection: 'row',
    padding: 10
  },
  textContainer: {
    flex: 1,
    flexDirection: 'row'
  },
  columnContainer: {
    flex: 0.7,
    flexDirection: 'column'
  },
  address: {
    fontSize: 14,
    paddingRight: 10,
    color: '#656565',
  },
  distance:{
    color: '#1464ED'
  },
  separator: {
    height: 1,
    backgroundColor: '#dddddd'
  }
});


class Listings extends Component{
  
  constructor(props){
    super(props);
    //this.deleteAll();
    var ds = new ListView.DataSource(
      {rowHasChanged: this.rowHasChanged.bind(this)});
    this.state = {dataSource: ds.cloneWithRows(props.listings)};
  }

  rowHasChanged(r1, r2){
    //console.log(r1.distance, r2.distance);
    return true;
  }

  rowPressed(id) {
    var listing = this.props.listings
      .filter(prop => prop.id === id)[0];

    navigator.geolocation.clearWatch(this.props.watchID);
    this.props.navigator.push({
      title: listing.address,
      component: ListingView,
      passProps: {listing: listing, 
            onDeleteListing: this.props.onDeleteListing,
            lat: this.props.lat, lng: this.props.lng}
    });
  }

  componentWillReceiveProps(nextProps){
    this.state = {dataSource: this.state.dataSource.cloneWithRows(nextProps.listings)};
    //console.log(nextProps.listings);
  }

  deleteAll(){
    AsyncStorage.removeItem('listings')
      .then(() => {
        this.state = {dataSource: this.state.dataSource.cloneWithRows([])};
      })
      .done();
  }

  renderRow(rowData, sectionID, rowID) {
    return (
      <TouchableHighlight onPress={() => this.rowPressed(rowData.id)}
          underlayColor='#dddddd'>
        <View tyle={styles.container}>
          <View style={styles.rowContainer}>
              <View  style={styles.columnContainer}>
                <Text style={styles.address} numberOfLines={1}>{rowData.address}</Text>
                <Text style={styles.address} >{rowData.city}</Text>
              </View>
              <Text style={styles.distance} numberOfLines={1}>{rowData.distance} mi</Text>
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
