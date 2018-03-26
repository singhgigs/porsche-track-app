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

// const restApi = new Frisbee({
//   baseURI: 'http://localhost:3000/api',
//   headers: {
//     'Accept': 'application/json',
//     'Content-Type': 'application/json'
//   }
// });

class MyStatsView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      appIsReady: false,
      username: "",
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
  }

  componentWillMount() {

  }

  componentWillUnmount() {
    this.setState( { isMounted: false });
    console.log("Clearing mystats timer");
    TimerMixin.clearInterval(this.timer);
  }

  componentDidMount() {
    this.setState( { isMounted: true });
    fetch('http://localhost:3000/api'+'/userdata/?username='+this.props.username,
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
      fetch('http://localhost:3000/api'+'/userdata/?username='+this.props.username,
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




      //Data randomization to simulate driving
      var randomLaps = Math.floor(Math.random() * (100 - 10 + 1)) + 10;
      var randomAvgSpeed = Math.floor(Math.random() * (80 - 50 + 1)) + 50;
      var randomTopSpeed = Math.floor(Math.random() * (180 - 90 + 1)) + 90;
      var random0to60 = (Math.floor(Math.random() * (8 - 2 + 1)) + 2)+"s";
      var randomLapTime = "3:"+(Math.floor(Math.random() * (55 - 10 + 1)) + 10);
      var randomG = "1."+(Math.floor(Math.random() * (55 - 0 + 1)) + 0);

      let newData = {
        method: 'POST',
        body: JSON.stringify({
            laps: randomLaps+"",
            best_lap_time: randomLapTime+"",
            top_speed: randomTopSpeed+"",
            avg_speed: randomAvgSpeed+"",
            best_0_60: random0to60+"",
            max_g_force: randomG,
          }),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
      }
      //send new data to backend
      fetch('http://localhost:3000/api'+'/userdata/?username='+this.props.username, newData)
      .catch((error) => {
        console.log("Error in fetch POST: "+error);
      });


    }, 20000);

  }
  handleBtnClick() {
    this.setState( { isMounted: false });
    this.props.setCurrentView("allstats");
  }

  render() {
    return(
      <View style={styles.container}>
        <Image
          source={require('../assets/images/p911.png')}
          style={styles.carImage}/>
        <View style={styles.horizontalContainer}>
          <TrackingView>
              <Image
                source={require('../assets/images/dataShare.png')}
                style={styles.animationImage}/>
        </TrackingView>
        <Text style={styles.textStyle}> Data Sync is Active </Text>
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
        title="View All Vehicle Data"
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
  flex: 0.1,
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
  width: 700,
  height: 175,
  resizeMode: 'contain',
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
  console.log("MyStats View mapping state to props: "+state.loginReducer.username);
  return {
    username: state.loginReducer.loginUsername,
    password: state.loginReducer.loginpassword,
    submitLoading: state.loginReducer.isSubmitBtnLoading,
    currentView: state.loginReducer.currentView,
  }
}
export default connect(mapStateToProps, { setUsername, setPassword, setSubmitLoading, setCurrentView })(MyStatsView);
