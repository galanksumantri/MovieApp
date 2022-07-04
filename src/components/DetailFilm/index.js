import React from 'react';
import {Dimensions, Image, StyleSheet, Text, View} from 'react-native';
import { Rating } from 'react-native-elements';
import { fonts, colors } from '../../utils';

function DetailFilm({
  title, tagline, status, date, voteAverage, runtime, source,
}) {
  return (
    <View style={styles.card}>
      <Image source={source} style={styles.image} />
      <View style={styles.detailFilm}>
        <Text style={styles.title}>{title}</Text>
        <View style={{ flexDirection: 'row', marginTop: 5 }}>
          <Text style={styles.description}>Tagline : </Text>
          <Text style={styles.contentDescription}>{tagline}</Text>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <Text style={styles.description}>Status : </Text>
          <Text style={styles.contentDescription}>{status}</Text>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <Text style={styles.description}>Release Date : </Text>
          <Text style={styles.contentDescription}>{date}</Text>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <Text style={styles.description}>Runtime : </Text>
          <Text style={styles.contentDescription}>
            {runtime}
            {' '}
            minute
          </Text>
        </View>
        <Text style={styles.ratingNumber}>
          {voteAverage}
          /10
        </Text>
        <Rating
          imageSize={20}
          readonly
          startingValue={voteAverage / 2}
          ratingCount={5}
          fractions={2}
          style={styles.rating}
          tintColor={colors.background.primary}
        />
      </View>
    </View>
  );
}

export default DetailFilm;

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  card: {
    width: windowWidth * 0.95,
    height: windowHeight * 0.3,
    backgroundColor: colors.background2,
    alignSelf: 'center',
    marginTop: -windowHeight * 0.16,
    borderRadius: 4,
    paddingVertical: 12,
    paddingHorizontal: 8,
    flexDirection: 'row',
  },
  image: {
    height: '100%',
    width: null,
    flex: 2,
    marginRight: 10,
  },
  detailFilm: {
    flex: 4,
  },
  title: {
    fontSize: 18,
    color: colors.text.primary,
    fontFamily: fonts.primary[600],
  },
  description: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: 'bold',
    fontFamily: fonts.primary[600],
  },
  contentDescription: {
    fontSize: 14,
    color: colors.text.primary,
    fontFamily: fonts.primary[400],
  },
  rating: {
    alignSelf: 'flex-start',
  },
  ratingNumber: {
    color: colors.text.primary,
    fontFamily: fonts.primary[400],
    fontSize: 14,
    marginTop: 5,
  },
});
