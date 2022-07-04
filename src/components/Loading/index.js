import {StyleSheet, Text, View, ActivityIndicator, StatusBar} from 'react-native';
import React from 'react';
import { colors } from '../../utils';

function Loading() {
  return (
    <View style={styles.wrapper}>
      <StatusBar barStyle="light-content" backgroundColor={colors.primary} />
      <ActivityIndicator size="large" color={colors.secondary} />
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
    backgroundColor: colors.primary,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
  },
  text: {
    fontSize: 15,
    color: colors.secondary,
    marginTop: 12,
  },
});
