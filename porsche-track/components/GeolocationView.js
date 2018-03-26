import React, { Component } from 'react';
import { View, Text } from 'react-native';

var TimerMixin = require('react-timer-mixin');
//var reactMixin = require('react-mixin');
import { bindActionCreators } from 'redux'
import { gpsSetCurrentLat } from '../actions';
import { gpsSetCurrentLong } from '../actions';
var Redis = require('react-native-redis');
const timer = require('react-native-timer');
import { connect } from 'react-redux';

import Frisbee from 'frisbee';

const restApi = new Frisbee({
  baseURI: 'https://corosdataapi.azurewebsites.net',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
});

class GeolocationView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      latitude: null,
      longitude: null,
      error: null,
      updated: 'NO',
      counter: 0,
      timer: null,
    };
  }

  componentDidMount() {
    this.timer = TimerMixin.setInterval(() => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          var newCounter = this.state.counter+1;
          this.setState({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            error: null,
            counter: newCounter,
            updated: 'YES'+this.state.counter,
          });
          this.props.gpsSetCurrentLat(position.coords.latitude);
          this.props.gpsSetCurrentLong(position.coords.longitude);
          sendGpsDataToServer(position.coords.latitude, position.coords.longitude, new Date().toLocaleString());
        },
        (error) => this.setState({ error: error.message }),
        { enableHighAccuracy: true, timeout: 1000, maximumAge: 500 },
      );
    }, 5000);
  }

  componentWillUnmount() {
    TimerMixin.clearInterval(this.timer);

  }

  componentWillMount() {
    this.props.gpsSetCurrentLat(51.5033640);
    this.props.gpsSetCurrentLong(-0.1276250);
  }

  render() {
    return (

      <View style={{ flexGrow: 1, alignItems: 'center', justifyContent: 'center', width: 100, height: 80, }}>
        <Text style={{fontSize: 20}}>Latitude: {this.state.latitude}</Text>
        <Text style={{fontSize: 20}}>Longitude: {this.state.longitude}</Text>
        {this.state.error ? <Text>Error: {this.state.error}</Text> : null}
      </View>
    );
  }
}

async function sendGpsDataToServer(lat, long, ts) {
  try {
    res = await restApi.post('/geolocation', {
      body: { "latitude": lat,
    "longitude": long,
    "vanId": "00",
    "timestamp": ts }});
    // handle HTTP or API errors
    if (res.err) console.log(res.err);
    else {
      console.log(res.body.result+  ' TimeStamp: '+ts);
    }
  } catch (error) {
    console.log("Error in frisbee rest call"+error);
  }
}

function mapStateToProps(state) {
  return {
    latitude: state.gpsCurrentLat,
    longitude: state.gpsCurrentLong
  }
}

export default connect(mapStateToProps, { gpsSetCurrentLong, gpsSetCurrentLat })(GeolocationView);
