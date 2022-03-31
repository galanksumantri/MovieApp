import {
  StyleSheet, Text, View, ActivityIndicator, StatusBar,
} from 'react-native';
import React from 'react';

function Loading() {
  return (
    <View style={styles.wrapper}>
      <StatusBar barStyle="light-content" backgroundColor="#564AA5" />
      <ActivityIndicator size="large" color="#FBC263" />
      <Text style={styles.text}>Loading ...</Text>
    </View>
  );
}

export default Loading;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    position: 'absolute',
    alignItems: 'center',
    backgroundColor: '#564AA5',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
  },
  text: {
    fontSize: 15,
    color: '#FBC263',
    marginTop: 12,
  },
});
