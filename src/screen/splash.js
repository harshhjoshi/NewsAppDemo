import React from 'react';
import {Text, View, ImageBackground, StyleSheet} from 'react-native';

//Class component For Splash Screen
export default class splash extends React.Component {
  constructor(props) {
    super(props);
  }

  //When user come to the app and splash screen will call this function
  componentDidMount() {
    setTimeout(() => {
      this.props.navigation.navigate('DashBoard');
    }, 3000);
  }

  //Desighning for Splash screen
  render() {
    return (
      <View>
        {/* Splash screen content */}
        <ImageBackground
          style={styles.imageBackground}
          source={require('../assets/Splash.png')}>
          {/* Splash screen Text App Name */}
          <Text style={styles.textAppname}>News Updates</Text>
        </ImageBackground>
      </View>
    );
  }
}

//Outline stying
const styles = StyleSheet.create({
  // Styling for Splash screen image
  imageBackground: {
    height: '100%',
    width: '100%',
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  // Styling for Splash screen App name
  textAppname: {
    alignSelf: 'center',
    fontSize: 28,
    color: '#fff',
    fontWeight: '600',
    marginBottom: '40%',
  },
});
