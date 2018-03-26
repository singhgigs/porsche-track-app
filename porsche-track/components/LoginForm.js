import React, {Component} from 'react';
// import PropTypes from 'prop-types';
// import Dimensions from 'Dimensions';
import { bindActionCreators } from 'redux'
import { setUsername } from '../actions';
import { setPassword } from '../actions';
import { setSubmitLoading } from '../actions';
import { setCurrentView } from '../actions';
import { connect } from 'react-redux';
import {
  StyleSheet,
  KeyboardAvoidingView,
  View,
  ActivityIndicator,
  TouchableOpacity,
  Image,
} from 'react-native';

import UserInput from './UserInput';
import ButtonSubmit from './ButtonSubmit';
//import SignupSection from './SignupSection';

import usernameImg from '../assets/images/login/username.png';
import passwordImg from '../assets/images/login/password.png';
import eyeImg from '../assets/images/login/eye_black.png';
import userImg from '../assets/images/login/username.png';

import Frisbee from 'frisbee';

const restApi = new Frisbee({
  //baseURI: 'https://corosdataapi.azurewebsites.net',
  baseURI: 'http://localhost:3000/api',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
});

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showPass: true,
      press: false,
      username: "",
      password: "",
      isSubmitBtnLoading: false,
      currentView: "login",
    };
    this.showPass = this.showPass.bind(this);
    this.submitClick = this.submitClick.bind(this);
  }

  showPass() {
    this.state.press === false
      ? this.setState({showPass: false, press: true})
      : this.setState({showPass: true, press: false});
  }

  submitClick() {
    this.setState({isSubmitBtnLoading: true});
    this.props.setUsername(this.state.username);
    this.props.setPassword(this.state.password);
    console.log("Submit pressed. Uname: "+this.state.username+"   Password: "+this.state.password);
    authenticateWithServer(this.state.username, this.state.password, function(authResponse) {
      if(authResponse == undefined) {
        //auth failed due to wrong user password
      }
    });
    this.props.setCurrentView("mystats");
    console.log("currentView: "+this.props.currentView);
  }

  async componentDidMount() {
  }

  render() {
    return (
      <View style={styles.loginContainer}>
        <UserInput
          source={usernameImg}
          placeholder="Username"
          autoCapitalize={'none'}
          returnKeyType={'done'}
          autoCorrect={false}
          onTextChanged={(text) => this.setState({username: text})}
        />
        <UserInput
          source={passwordImg}
          secureTextEntry={this.state.showPass}
          placeholder="Password"
          returnKeyType={'done'}
          autoCapitalize={'none'}
          autoCorrect={false}
          onTextChanged={(text) => this.setState({password: text})}
        />
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.btnEye}
          onPress={this.showPass}>
          <Image source={eyeImg} style={styles.iconEye} />
        </TouchableOpacity>

        <ButtonSubmit
          isLoading={this.state.isSubmitBtnLoading}
          onPressed={this.submitClick}
        />
        </View>
    );
  }
}

async function authenticateWithServer(username, password, callback) {
  restApi.auth(username, password);
  try {
    res = await restApi.get('/users');
    console.log("Auth response: "+res.body);
    callback(res.body);
  } catch (error) {
    console.log("Cannot authenticate with Server. Log: "+error);
  }
}

// const DEVICE_WIDTH = Dimensions.get('window').width;
// const DEVICE_HEIGHT = Dimensions.get('window').height;

const styles = StyleSheet.create({
  loginContainer: {
    flex: 0.3,
    alignItems: 'center',
    marginTop: 50,
  },
  btnEye: {
    position: 'absolute',
    top: 75,
    left: 28,
  },
  userImg: {
    position: 'absolute',
    top: 58,
    left: 28,
  },
  iconEye: {
    width: 25,
    height: 25,
    tintColor: 'rgba(0,0,0,0.2)',
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

export default connect(mapStateToProps, { setUsername, setPassword, setSubmitLoading, setCurrentView })(Form);
