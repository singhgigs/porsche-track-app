import React from 'react';
import { Animated, Text, View } from 'react-native';

export default class TrackingView extends React.Component {
  state = {
    animatedStartValue: new Animated.Value(0),  // Initial value for opacity: 0
  }

  componentDidMount() {
    Animated.loop(
  Animated.sequence([
    Animated.timing(this.state.animatedStartValue, {
      toValue: 1,
      duration: 500,
      delay: 300
    }),
    Animated.timing(this.state.animatedStartValue, {
      toValue: 0,
      duration: 500
    })
  ]),
).start();
  }

  render() {
    let { animatedStartValue } = this.state;

    return (
      <Animated.View                 // Special animatable View
        style={{
          ...this.props.style,
          opacity: animatedStartValue,         // Bind opacity to animated value
        }}
      >
        {this.props.children}
      </Animated.View>
    );
  }
}
