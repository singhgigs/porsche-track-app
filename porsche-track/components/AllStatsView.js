import React, { Component } from 'react';
import {
  Button,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  ImageBackground,
} from 'react-native';

import { bindActionCreators } from 'redux'
import { setUsername } from '../actions';
import { setPassword } from '../actions';
import { setSubmitLoading } from '../actions';
import { setCurrentView } from '../actions';
import { connect } from 'react-redux';
import blackBgImage from '../assets/images/blackBgImage.png';
import TrackingView from '../components/TrackingView';
import GridView from 'react-native-super-grid';
import Frisbee from 'frisbee';
var TimerMixin = require('react-timer-mixin');
const timer = require('react-native-timer');

class AllStatsView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      appIsReady: false,
      username: "porsche2",
      password: "",
      isSubmitBtnLoading: false,
      currentView: "login",
      laps: "--",
      best_lap_time: "-:-s",
      top_speed: "--mph",
      avg_speed: "--mph",
      best_0_60: "--s",
      max_g_force: "--",
      isMounted: false,
    };
    this.handleBtnClick = this.handleBtnClick.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
  }

  componentWillMount() {

  }

  componentWillUnmount() {
    this.setState( { isMounted: false });
    console.log("Clearing allstats timer");
    TimerMixin.clearInterval(this.timer);
  }

  componentDidMount() {
    this.setState( { isMounted: true });
    fetch('http://localhost:3000/api'+'/userdata/?username='+this.state.username,
    {method: 'GET'},
    {headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }})
    .then((response) => response.json())
    .then((responseJson) => {
    console.log("User data server response: Laps: "+responseJson.laps);
    if(this.state.isMounted){
      this.setState( {
        laps: responseJson.laps,
        best_lap_time: responseJson.best_lap_time,
        top_speed: responseJson.top_speed,
        avg_speed: responseJson.avg_speed,
        best_0_60: responseJson.best_0_60,
        max_g_force: responseJson.max_g_force,
       } );
    }
    })
    .catch((error) => {
      console.log("Error in fetch: "+error);
    });

    this.timer = TimerMixin.setInterval(() => {
      fetch('http://localhost:3000/api'+'/userdata/?username='+this.state.username,
      {method: 'GET'},
      {headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }})
      .then((response) => response.json())
      .then((responseJson) => {
      console.log("User data server response: Laps: "+responseJson.laps);
      if(this.state.isMounted){
        this.setState( {
          laps: responseJson.laps,
          best_lap_time: responseJson.best_lap_time,
          top_speed: responseJson.top_speed,
          avg_speed: responseJson.avg_speed,
          best_0_60: responseJson.best_0_60,
          max_g_force: responseJson.max_g_force,
         } );
       }
      })
      .catch((error) => {
        console.log("Error in fetch: "+error);
      });

    }, 10000);

  }

  handleBtnClick() {
    this.setState( { isMounted: false });
    this.props.setCurrentView("mystats");
  }

  handleScroll() {
    console.log("Handle Scroll called");
    if(this.state.username == "porsche2") {
      this.setState( {username: "porsche3"} );
    } else {
      this.setState( {username: "porsche2"} );
    }

    fetch('http://localhost:3000/api'+'/userdata/?username='+this.state.username,
    {method: 'GET'},
    {headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }})
    .then((response) => response.json())
    .then((responseJson) => {
    console.log("User data server response: Laps: "+responseJson.laps);
    if(this.state.isMounted){
      this.setState( {
        laps: responseJson.laps,
        best_lap_time: responseJson.best_lap_time,
        top_speed: responseJson.top_speed,
        avg_speed: responseJson.avg_speed,
        best_0_60: responseJson.best_0_60,
        max_g_force: responseJson.max_g_force,
       } );
     }
    })
    .catch((error) => {
      console.log("Error in fetch: "+error);
    });

  }


  render() {
    return(
      <View style={styles.container}>
      <View style={styles.horizontalScroll}>
      <ScrollView horizontal={true}
                  snapToAlignment={"center"}
                  pagingEnabled={true}
                  onMomentumScrollEnd={this.handleScroll}>
        <View style={styles.scrollItemView}>
        <Image
          source={require('../assets/images/p911.png')}
          style={styles.carImage}/>
        <Text style={styles.carName}>911 Turbo</Text>
        </View>
        <View style={styles.scrollItemView}>
        <Image
          source={require('../assets/images/p911.png')}
          style={styles.carImage}/>
        <Text style={styles.carName}>911 GT3RS</Text>
        </View>
        </ScrollView>
        </View>
        <GridView
        itemDimension={150}
        items={[
        { name: 'Laps', value: this.state.laps }, { name: 'Best Lap Time', value: this.state.best_lap_time },
        { name: 'Top Speed', value: this.state.top_speed }, { name: 'Avg Speed', value: this.state.avg_speed },
        { name: 'Best 0-60', value: this.state.best_0_60 }, { name: 'Max G-Force', value: this.state.max_g_force },
        ]}
        style={styles.gridView}
        renderItem={item => (
          <View style={[styles.itemContainer, { backgroundColor: '#155884' }]}>
            <Text style={styles.itemvalue}>{item.value}</Text>
            <Text style={styles.itemName}>{item.name}</Text>
          </View>
        )}
      />
      <View style={styles.bottomButton}>
      <Button
        onPress={this.handleBtnClick}
        title="View My Data"
        color="#cc0000"
        />
      </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#000000',
    justifyContent: 'center',
  },
  horizontalScroll: {
    flex: 0.60,
    alignItems: 'center',
  },
  scrollItemView: {
    flex: 1,
  },
  textStyle: {
  fontSize: 15,
  color: '#00b33c',
  lineHeight: 24,
  textAlign: 'center',
  },
  tempGaugeContainer: {
    width: 900,
    height: 100,
  },
  horizontalContainer: {
  flex: 0.3,
  flexDirection: 'row',
  height: 80,
  backgroundColor: '#000000',
  justifyContent: 'center',
},
bottomButton: {
  flex: 0.25,
},
  animationImage: {
  width: 30,
  height: 25,
  resizeMode: 'contain',
  marginTop: 5,
  marginLeft: -10,
},
  carImage: {
  width: 400,
  height: 180,
  resizeMode: 'contain',
  flexDirection: 'row',
  padding: 2,
  margin: 2,
  },
  carName: {
    fontSize: 23,
    color: '#fff',
    fontWeight: '600',
    textAlign: 'center',
  },
  //Grid styles below
  gridView: {
    paddingTop: 5,
    flex: 1,
  },
  itemContainer: {
    justifyContent: 'flex-end',
    borderRadius: 5,
    padding: 10,
    height: 100,
  },
  itemName: {
    fontSize: 23,
    color: '#fff',
    fontWeight: '600',
  },
  itemvalue: {
    fontWeight: '600',
    fontSize: 36,
    color: '#fff',
  },
});
function mapStateToProps(state) {
  return {
    username: state.loginReducer.username,
    password: state.loginReducer.password,
    submitLoading: state.loginReducer.isSubmitBtnLoading,
    currentView: state.loginReducer.currentView,
  }
}

export default connect(mapStateToProps, { setUsername, setPassword, setSubmitLoading, setCurrentView })(AllStatsView);
