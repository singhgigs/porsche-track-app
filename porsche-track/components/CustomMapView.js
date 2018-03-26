import React, { Component } from 'react';
import { Image, View, Text, StyleSheet } from 'react-native';
import { Constants, Components } from 'expo';
import MapView from 'react-native-maps';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { gpsSetCurrentLat } from '../actions';
import { gpsSetCurrentLong } from '../actions';
import { Marker } from 'react-native-maps';

class CustomMapView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mapRegion: { latitude: 37.78825, longitude: -122.4324, latitudeDelta: 0.0922, longitudeDelta: 0.0421 }
    };
  }

  _handleMapRegionChange = mapRegion => {
  this.setState({ mapRegion });
  };

  render() {
      return (
        <View style={mapStyles.container}>
          <MapView 
            style={{ alignSelf: 'stretch', height: 600 }}
            region={this.props.mapRegion}
            onRegionChange={this._handleMapRegionChange}>

          <Marker coordinate={this.props.LatLng}
            image={require('../assets/images/map-min.png')}
            />
          </MapView>
        </View>
      );
  }
}

const mapStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
  },
});

function mapStateToProps(state) {
  return {
    mapRegion: {latitude: state.gpsReducer.gpsCurrentLat, longitude: state.gpsReducer.gpsCurrentLong, latitudeDelta: 0.0122, longitudeDelta: 0.0121},
    LatLng: {latitude: state.gpsReducer.gpsCurrentLat, longitude: state.gpsReducer.gpsCurrentLong}

  }
}

//connects redux actions to props
function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    gpsSetCurrentLong: gpsSetCurrentLong,
    gpsSetCurrentLong: gpsSetCurrentLong
  }, dispatch);
}

//export default connect(mapStateToProps, { gpsSetCurrentLat, gpsSetCurrentLong })(CustomMapView);
export default connect(mapStateToProps)(CustomMapView);
