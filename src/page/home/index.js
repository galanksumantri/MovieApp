import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {
  Dimensions, Image, ScrollView, StatusBar, StyleSheet, Text, View, RefreshControl,
} from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import {
  Card, ListFilm, Loading, NoInternet,
} from '../../components';

function Home({ navigation }) {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [isOffline, setOfflineStatus] = useState(false);

  let isMounted = true;

  function latest_sort(a, b) {
    return new Date(b.release_date).getTime() - new Date(a.release_date).getTime();
  }

  function recommended_sort(a, b) {
    return parseFloat(b.popularity) - parseFloat(a.popularity);
  }

  async function onRefresh() {
    setRefreshing(true);
    try {
      await axios.get('http://code.aldipee.com/api/v1/movies').then((response) => {
        setData(response.data.results);
        setRefreshing(false);
      });
    } catch (error) {
      console.error(error);
    }
  }

  async function getData() {
    try {
      await axios.get('http://code.aldipee.com/api/v1/movies').then((response) => {
        if (isMounted) setData(response.data.results);
        isOffline && setOfflineStatus(false);
      });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const removeNetInfoSubscription = NetInfo.addEventListener((state) => {
      const offline = !(state.isConnected && state.isInternetReachable);
      setOfflineStatus(offline);
    });

    getData();
    return () => {
      isMounted = false;
      removeNetInfoSubscription();
    };
  }, []);

  return (
    <>
      {isOffline == true ? (
        <NoInternet onRetry={getData} isRetrying={isLoading} />
      ) : isLoading ? (
        <Loading />
      ) : (
        <View View style={styles.page}>
          <StatusBar barStyle="light-content" backgroundColor="#72808A" />
          <ScrollView
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
          >
            <Text style={styles.label}>Recommended</Text>
            <View style={styles.wrapperScroll}>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View style={styles.recommended}>
                  {data.sort(recommended_sort).map((item) => (
                    <Card key={item.id} style={styles.cardFilm}>
                      <Image source={{ uri: item.poster_path }} style={styles.image} />
                    </Card>
                  ))}
                </View>
              </ScrollView>
            </View>
            <Text style={styles.label}>Latest Upload</Text>
            <View style={styles.wrapperSections}>
              {data.sort(latest_sort).map((item) => (
                <ListFilm
                  key={item.id}
                  title={item.title}
                  rating={item.vote_average}
                  date={item.release_date}
                  genre={item.id}
                  source={{ uri: item.poster_path }}
                  onPress={() => navigation.navigate('Detail', { id: item.id })}
                />
              ))}
            </View>
          </ScrollView>
        </View>
      )}
    </>
  );
}

export default Home;

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: '#564AA5',
    paddingVertical: 13,
    paddingHorizontal: 13,
  },

  label: {
    color: '#FBC263',
    fontSize: 20,
  },

  recommended: {
    flexDirection: 'row',
    marginBottom: 16,
  },

  wrapperSections: {
    justifyContent: 'space-between',
  },
  image: {
    height: windowHeight * 0.25,
    width: windowWidth * 0.3,
  },
  cardFilm: {
    marginRight: 15,
  },
});
