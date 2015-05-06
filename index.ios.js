'use strict';

var React = require('react-native');
var Listings = require('./Listings');
var AddListing = require('./AddListing');
var utils = require('./utils');
var _ = require('lodash');

var styles = React.StyleSheet.create({
  container: {
    flex: 1
  }
});

var data = [{'id':0, 'address': '1043 Dale Ave', 'city': 'Mountain View', 'state': 'CA','lat': 37.374082, 'lng': -122.062983, distance:0},
    {'id':1, 'address': '3158 Emerson St', 'city': 'Palo Alto', 'state': 'CA','lat': 37.42286, 'lng': -122.129873, distance:0},
    {'id':2, 'address': '410 N Mary Ave', 'city': 'Sunnyvale', 'state': 'CA','lat': 37.3894263, 'lng': -122.0405288, distance:0},
    {'id':3, 'address': '25 South 6th Street', 'city': 'Austin', 'state': 'TX','lat': 38.7411761, 'lng': -85.8122836, distance:0}];

class OpenHouseApp extends React.Component {

  constructor(props){
    super(props);
    this.state = {listings:data};
  }

  componentDidMount(){
    this.watchID = navigator.geolocation.watchPosition((lastPosition) => {
      var curLat = lastPosition.coords.latitude;
      var curLon = lastPosition.coords.longitude;
      this._updateDistances(curLat, curLon);
    });
  }

  componentWillUnmount(){
    navigator.geolocation.clearWatch(this.watchID);
  }

  _updateDistances(curLat, curLon){
    _.map(this.state.listings, function(cur){
      cur.distance = utils.calcCrow(cur.lat, cur.lng, curLat, curLon);
      return cur;
    });
    this.state.watchID = this.watchID;
    this.refs.nav.replace({
      title: 'Listing',
      component: Listings,
      passProps: this.state,
      rightButtonTitle: '+',
      onRightButtonPress: this.addListingView.bind(this)
    });
  }

  addListingView(){
    navigator.geolocation.clearWatch(this.watchID);
    this.refs.nav.push({
      title: 'Add Listing',
      component: AddListing
    });
  }

  render() {
    return (
      <React.NavigatorIOS
        style={styles.container}
        ref="nav"
        initialRoute={{
          title: 'Listings',
          component: Listings,
          passProps: this.state,
          rightButtonTitle: '+',
          onRightButtonPress: this.addListingView.bind(this)
        }}/>
    );
  }
}

React.AppRegistry.registerComponent('openHouse', () => OpenHouseApp);
