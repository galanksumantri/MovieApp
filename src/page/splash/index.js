import {StyleSheet, Text, View, Image, StatusBar} from 'react-native';
import React, { useEffect } from 'react';
import { Logo1 } from '../../asset';
import { colors } from '../../utils';

function Splash({ navigation }) {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace('Home');
    }, 2500);
  }, [navigation]);

  return (
    <View style={styles.page}>
      <StatusBar barStyle="light-content" backgroundColor={colors.primary} />
      <Image style={styles.image} source={Logo1} />
      <Text style={styles.title}>Gold Movie</Text>
      <Text style={styles.nickname}>GALANG SUMANTRI</Text>
    </View>
  );
}

export default Splash;

const styles = StyleSheet.create({
  page: {
    backgroundColor: colors.primary,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 15,
    color: colors.secondary,
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
