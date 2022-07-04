import {StyleSheet, Text, View, StatusBar} from 'react-native';
import React from 'react';
import Button from '../Button';
import { colors } from '../../utils';

function NoInternet({ onRetry, isRetrying }) {
  return (
    <View style={styles.wrapper}>
      <StatusBar barStyle="light-content" backgroundColor={colors.primary} />
      <View style={styles.Container}>
        <Text style={styles.Title}>ERROR</Text>
        <Text style={styles.Text}>No Internet Connection</Text>
        <Button onPress={onRetry} disabled={isRetrying} title="Try Again" />
      </View>
    </View>
  );
}

export default NoInternet;

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

  Container: {
    backgroundColor: colors.primary,
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 40,
    alignItems: 'center',
  },
  Title: {
    fontSize: 22,
    color: colors.secondary,
  },
  Text: {
    fontSize: 18,
    color: '#000',
    marginTop: 5,
    textAlign: 'center',
    marginBottom: 20,
  },
});
