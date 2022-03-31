import {
  StyleSheet, Text, TouchableOpacity, Dimensions,
} from 'react-native';
import React from 'react';

function Button({ onPress, disabled, title }) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress} disabled={disabled}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}

export default Button;

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'purple',
    width: windowWidth * 0.3,
    height: windowHeight * 0.05,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  text: {
    color: '#FBC263',
    fontSize: 14,
  },
});
