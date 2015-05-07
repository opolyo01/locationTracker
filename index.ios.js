'use strict';

var React = require('react-native');
var Listings = require('./Listings');
var AddListing = require('./AddListing');
var utils = require('./utils');
var _ = require('lodash');
var {
  AsyncStorage,
  NavigatorIOS,
  AppRegistry
} = React;

var styles = React.StyleSheet.create({
  container: {
    flex: 1
  }
});

var data = [{'id':0, 'address': '1043 Dale Ave', 'city': 'Mountain View', 'state': 'CA','lat': 37.374082, 'lng': -122.062983, distance:0},
    {'id':1, 'address': '3158 Emerson St', 'city': 'Palo Alto', 'state': 'CA','lat': 37.42286, 'lng': -122.129873, distance:0},
    {'id':2, 'address': '410 N Mary Ave', 'city': 'Sunnyvale', 'state': 'CA','lat': 37.3894263, 'lng': -122.0405288, distance:0},
    {'id':3, 'address': '25 South 6th Street', 'city': 'Austin', 'state': 'TX','lat': 38.7411761, 'lng': -85.8122836, distance:0}];

AsyncStorage.setItem('listings', JSON.stringify(data))
  .then(() => AsyncStorage.getItem('listings')
  .then((value) => console.log(value)))
  .done();


class OpenHouseApp extends React.Component {

  constructor(props){
    super(props);
    this.state = {listings:data};
    AsyncStorage.getItem('listings')
      .then((value) => this.state = {listings:JSON.parse(value)})
      .done();
    
    this.initialRoute = {
      title: 'Listings',
      component: Listings,
      passProps: this.state,
      rightButtonTitle: '+',
      onRightButtonPress: this.addListingView.bind(this)
    };
  }

  componentDidMount(){
    this.startWatch();
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
    this.redrawListings(false);
  }

  onAddListing(listing){
    this.refs.nav.pop();
    this.state.listings.push(listing);
    //It will call render but will not call render of Listings class
    //this.setState(this.state);
    //Replacing View still keeps the old state because of refs.nav.pop()???
    this.redrawListings(true);
  }

  addListingView(){
    navigator.geolocation.clearWatch(this.watchID);
    this.refs.nav.push({
      title: 'Add Listing',
      component: AddListing,
      passProps: {onAddListing: this.onAddListing.bind(this), onCancelListing: this.redrawListings.bind(this, true)}
    });
  }

  startWatch(){
    this.watchID = navigator.geolocation.watchPosition((lastPosition) => {
      var curLat = lastPosition.coords.latitude;
      var curLon = lastPosition.coords.longitude;
      this._updateDistances(curLat, curLon);
    });
  }

  redrawListings(startWatch){
    this.refs.nav.replace(this.initialRoute);
    if(startWatch){
      this.startWatch();
    }
  }

  render() {
    return (
      <NavigatorIOS
        style={styles.container}
        ref="nav"
        initialRoute={this.initialRoute}/>
    );
  }
}

AppRegistry.registerComponent('openHouse', () => OpenHouseApp);
