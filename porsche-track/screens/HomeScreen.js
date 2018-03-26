import React, { Component } from 'react';
import {
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

const SCREEN_HEIGHT = Dimensions.get('window').height;
import TrackingView from '../components/TrackingView';
import { WebBrowser } from 'expo';

import { MonoText } from '../components/StyledText';

import GeolocationView from '../components/GeolocationView';

import CustomMapView from '../components/CustomMapView';

import LoginForm from '../components/LoginForm';

import MyStatsView from '../components/MyStatsView';
import AllStatsView from '../components/AllStatsView';

import { STATUS_BAR_HEIGHT } from '../constants/Layout';

import { bindActionCreators } from 'redux'
// import { setUsername } from '../actions';
// import { setPassword } from '../actions';
// import { setSubmitLoading } from '../actions';
// import { setCurrentView } from '../actions';
import { connect } from 'react-redux';

import topIconImage from '../assets/images/porsche_icon_noBg.png';
import topCenterIconImage from '../assets/images/porsche_top_middleIcon.png';
import homeBgImage from '../assets/images/homeBgImage.jpg';
import blackBgImage from '../assets/images/blackBgImage.jpeg';

// import topIconImage from '../assets/images/dummy/dummy.png';
// import topCenterIconImage from '../assets/images/dummy/dummy.png';
// import homeBgImage from '../assets/images/dummy/dummy.png';

import Expo from 'expo';

const cacheImages = images => images.map(image => {
  if (typeof image === 'string') return Image.prefetch(image);
  return Expo.Asset.fromModule(image).downloadAsync();
});

class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      appIsReady: false,
      username: "",
      password: "",
      isSubmitBtnLoading: false,
      currentView: "login",
    };
  }
  // static navigationOptions = {
  //   header: null,
  // };
  static navigationOptions = () => ({
    headerTitle: (
    <Image source={topCenterIconImage}
          style = {styles.topMiddleIcon}/>),
    headerStyle: {
      height: Platform.OS === 'android' ? 54 + STATUS_BAR_HEIGHT : 54,
      backgroundColor:'#000000'
    },
    headerTitleStyle: {
      marginTop: Platform.OS === 'android' ? STATUS_BAR_HEIGHT : 0,
      color: 'white'
    },
    headerLeft:
      <Image
        source={topIconImage}
        style = {styles.topIcon}
        />
  });

  componentWillMount() {
    this._loadAssetsAsync();
  }

  async _loadAssetsAsync() {
    const imageAssets = cacheImages([topIconImage]);
    await Promise.all([...imageAssets]);
    this.setState( { appIsReady: true } );
  }
  render() {
    if(this.props.currentView == "login") {
      return (
        <View>
        <ImageBackground
          style={{width: '100%', height: '100%', opacity: 0.9}}
          source={homeBgImage}>
          <LoginForm style={styles.contentContainer}/>
        </ImageBackground>
        </View>
      );
    } else if (this.props.currentView == "mystats") {
      return (
        <View style={styles.container}>
        <MyStatsView/>
        </View>
      );
    } else if (this.props.currentView == "allstats") {
      return (
        <View style={styles.container}>
        <AllStatsView/>
        </View>
      );
    }
  }
}
//https://github.com/expo/react-native/archive/sdk-25.0.0.tar.gz
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  horizontalContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#fff',
  },
  mapContainer: {
    ...StyleSheet.absoluteFillObject,
    height: 400,
    width: 400,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 0,
    height: SCREEN_HEIGHT * 0.5
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 5,
    marginBottom: 5,
  },
  topIcon: {
    marginTop: 0,
    marginLeft: 10,
    marginBottom: 5,
    width: 40,
    height: 40,
  },
  topMiddleIcon: {
    marginTop: 0,
    marginLeft: 10,
    width: 220,
    height: 20,
  },
  welcomeImage: {
    width: 150,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  animationImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 5,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  trackingText: {
    fontSize: 25,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 28,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
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

export default connect(mapStateToProps)(HomeScreen);
