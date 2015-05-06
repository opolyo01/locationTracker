'use strict';

var React = require('react-native');
var ListingView = require('./ListingView');

var {
  StyleSheet,
  Component,
  View,
  TouchableHighlight,
  ListView,
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
    flex: 0.5
  },
  city: {
    fontSize: 18,
    paddingRight: 10,
    color: '#656565',
    flex: 0.28
  },
  distance:{
    flex:0.22,
    marginRight: 10,
    color: '#1464ED'
  },
  rowContainer: {
    flexDirection: 'row',
    padding: 10
  }
});


class Listings extends Component{
  
  constructor(props){
    super(props);
    var ds = new ListView.DataSource(
      {rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {dataSource: ds.cloneWithRows(props.listings)};
  }

  rowPressed(id) {
    console.log(id);
    var listing = this.props.listings
      .filter(prop => prop.id === id)[0];

    navigator.geolocation.clearWatch(this.props.watchID);
    this.props.navigator.push({
      title: 'Listing',
      component: ListingView,
      passProps: {listing: listing}
    });

  }

  renderRow(rowData, sectionID, rowID) {
    return (
      <TouchableHighlight onPress={() => this.rowPressed(rowData.id)}
          underlayColor='#dddddd'>
        <View>
          <View style={styles.rowContainer}>
            <View  style={styles.textContainer}>
              <Text style={styles.address} numberOfLines={1}>{rowData.address}</Text>
              <Text style={styles.city} numberOfLines={1}>{rowData.city}</Text>
              <Text style={styles.distance} numberOfLines={1}>{rowData.distance} mi</Text>
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
