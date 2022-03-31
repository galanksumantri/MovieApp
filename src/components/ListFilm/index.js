import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {
  Dimensions, Image, StyleSheet, Text, View,
} from 'react-native';
import Button from '../Button';
import ListGenre from '../ListGenre';
import Loading from '../Loading';

function ListFilm({
  onPress, title, date, rating, genre, source,
}) {
  const [isLoading, setLoading] = useState(true);

  const [data, setData] = useState([]);
  useEffect(() => {
    let isMounted = true;
    getData(genre);
    return () => {
      isMounted = false;
    };

    async function getData(genre) {
      try {
        const response = await axios.get(`http://code.aldipee.com/api/v1/movies/${genre}`);
        if (isMounted) setData(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
  }, []);
  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <View style={styles.container}>
          <Image source={source} style={styles.imageStyle} />
          <View style={styles.description}>
            <Text style={styles.titleFilm}>{title}</Text>
            <Text style={styles.dateRelease}>{date}</Text>
            <Text style={styles.rating}>
              {rating}
              /10
            </Text>
            <View style={styles.wrapperGenre}>
              {data.genres.map((item) => <ListGenre key={item.id} genres={item.name} />)}
            </View>
            <View style={{ position: 'absolute', bottom: 0 }}>
              <Button onPress={onPress} title="Show More" />
            </View>
          </View>
        </View>
      )}
    </>
  );
}

export default ListFilm;

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginTop: 16,
    width: windowWidth * 0.95,
    height: windowHeight * 0.3,
  },
  imageStyle: {
    width: null,
    height: null,
    borderRadius: 11,
    marginRight: 16,
    flex: 2,
  },
  description: { flex: 4 },
  titleFilm: {
    fontSize: 16,
    color: '#FBC263',
    paddingBottom: 4,
  },
  dateRelease: {
    color: '#FBC263',
    fontSize: 12,
    paddingBottom: 4,
  },
  rating: {
    color: '#FBC263',
    fontSize: 12,
    paddingBottom: 4,
  },

  genre: {
    color: 'purple',
    fontSize: 12,
    paddingBottom: 4,
  },

  wrapperGenre: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});
