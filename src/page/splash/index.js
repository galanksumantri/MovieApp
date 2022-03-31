import {
  StyleSheet, Text, View, Image, StatusBar, Dimensions,
} from 'react-native';
import React, { useEffect } from 'react';
import { Logo, Logo1 } from '../../asset';

function Splash({ navigation }) {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace('Home');
    }, 2500);
  }, [navigation]);

  return (
    <View style={styles.page}>
      <StatusBar barStyle="light-content" backgroundColor="#564AA5" />
      <Image style={styles.image} source={Logo1} />
      <Text style={styles.title}>Gold Movie</Text>
      <Text style={styles.nickname}>GALANG SUMANTRI</Text>
    </View>
  );
}

export default Splash;

const styles = StyleSheet.create({
  page: {
    backgroundColor: '#564AA5',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 15,
    color: '#FBC263',
  },

  image: {
    height: '17.5%',
    width: '30%',
  },

  nickname: {
    fontSize: 10,
    color: '#000',
    position: 'absolute',
    bottom: 10,
  },
});
