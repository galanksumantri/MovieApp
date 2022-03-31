import {
  StyleSheet, Text, View, Dimensions,
} from 'react-native';
import React from 'react';

function ListGenre({ genres }) {
  return (
    <View style={styles.container}>
      <Text style={styles.genre}>{genres}</Text>
    </View>
  );
}

export default ListGenre;

const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  genre: {
    color: 'white',
    fontSize: 14,
    textAlign: 'center',
  },
  container: {
    marginHorizontal: 5,
    backgroundColor: '#EE8C84',
    borderRadius: 10,
    height: windowHeight * 0.04,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 5,
    paddingHorizontal: 10,
  },
});
