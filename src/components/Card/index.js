import React from 'react';
import { StyleSheet, View } from 'react-native';

function Card(props) {
  return <View style={{ ...styles.container, ...props.style }}>{props.children}</View>;
}

export default Card;

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    marginTop: 16,
    borderRadius: 4,
    overflow: 'hidden',
  },
});
