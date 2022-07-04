import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {
  Dimensions, Image, ImageBackground, ScrollView, StatusBar, StyleSheet, Text, View, RefreshControl,
} from 'react-native';
import Share from 'react-native-share';
import NetInfo from '@react-native-community/netinfo';
import {
  Card, DetailFilm, IconButton, ListGenre, Loading, NoInternet,
} from '../../components';
import { colors } from '../../utils';

function Detail({ route, navigation }) {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const { id } = route.params;
  const [refreshing, setRefreshing] = useState(false);
  const [isOffline, setOfflineStatus] = useState(false);

  let isMounted = true;

  async function onRefresh() {
    setRefreshing(true);
    try {
      await axios.get(`http://code.aldipee.com/api/v1/movies/${id}`).then((response) => {
        setData(response.data);
        setRefreshing(false);
      });
    } catch (error) {
      console.error(error);
    }
  }

  async function myCustomShare() {
    const shareOptions = {
      message: `Go to homepage for film ${data.original_title} ${data.homepage}`,
    };

    try {
      await Share.open(shareOptions);
    } catch (error) {
      console.log('Error : ', error);
    }
  }

  async function getData(id) {
    try {
      const response = await axios.get(`http://code.aldipee.com/api/v1/movies/${id}`);
      if (isMounted) setData(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const removeNetInfoSubscription = NetInfo.addEventListener((state) => {
      const offline = !(state.isConnected && state.isInternetReachable);
      setOfflineStatus(offline);
    });

    getData(id);
    return () => {
      isMounted = false;
      removeNetInfoSubscription();
    };
  }, []);

  if (!data) {
    return null;
  }

  return (
    <>
      {isOffline == true ? (
        <NoInternet onRetry={getData} isRetrying={isLoading} />
      ) : isLoading ? (
        <Loading />
      ) : (
        <View style={styles.page}>
          <StatusBar barStyle="light-content" backgroundColor={colors.primary} />
          <ScrollView
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
          >
            <ImageBackground
              source={{ uri: data.backdrop_path }}
              style={styles.header}
              imageStyle={{ opacity: 0.5 }}
            >
              <View style={styles.iconButton}>
                <View style={{ flex: 3 }}>
                  {/* <IconButton type="Back" onPress={() => navigation.goBack()} /> */}
                </View>
                <View
                  style={{
                    flex: 2,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}
                >
                  <View style={{ paddingLeft: 40 }}>
                    {/* <IconButton type="Like" /> */}
                  </View>
                  <View>
                    {/* <IconButton type="Share" onPress={myCustomShare} /> */}
                  </View>
                </View>
              </View>
            </ImageBackground>
            <DetailFilm
              title={data.title}
              voteAverage={data.vote_average}
              status={data.status}
              date={data.release_date}
              runtime={data.runtime}
              tagline={data.tagline}
              source={{ uri: data.poster_path }}
            />
            <View style={styles.bodyWrapper}>
              <Text style={styles.label}>Genres</Text>
              <View style={styles.genreSection}>
                {data.genres.map((item) => <ListGenre key={item.id} genres={item.name} />)}
              </View>
              <Text style={styles.label}>Synopsis</Text>
              <View style={styles.synopsisSection}>
                <Text style={styles.synopsis}>{data.overview}</Text>
              </View>
              <Text style={styles.label}>Actor/Artist</Text>
              <View style={styles.actorSection}>
                {data.credits.cast.map((item) => {
                  let test = '';
                  if (item.profile_path == 'https://image.tmdb.org/t/p/w500null') {
                    test = 'https://www.tech101.in/wp-content/uploads/2018/07/xblank-profile-picture-300x300.png.pagespeed.ic.vr0p7Y9_y4.webp';
                  } else {
                    test = item.profile_path;
                  }
                  return (
                    <Card key={item.id} style={styles.cardActor}>
                      <Image source={{ uri: test }} style={styles.image} />
                      <Text style={styles.name}>{item.name}</Text>
                    </Card>
                  );
                })}
              </View>
            </View>
          </ScrollView>
        </View>
      )}
    </>
  );
}

export default Detail;

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  header: {
    width: windowWidth,
    height: windowHeight * 0.3,
  },
  bodyWrapper: {
    marginHorizontal: 13,
  },
  genreSection: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  label: {
    marginTop: 18,
    color: colors.secondary,
    fontSize: 20,
    marginBottom: 10,
  },

  genre: {
    color: colors.secondary,
    fontSize: 14,
    marginRight: 10,
  },

  synopsis: {
    fontSize: 14,
    color: colors.secondary,
    textAlign: 'justify',
  },

  actorSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  iconButton: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginHorizontal: 13,
    marginVertical: 13,
  },
  cardActor: {
    height: windowHeight * 0.29,
    width: windowWidth * 0.29,
  },
  image: {
    height: '90%',
    width: null,
    resizeMode: 'contain',
  },
  name: {
    fontSize: 12,
    color: colors.button.secondary,
    textAlign: 'center',
    paddingTop: 5,
  },
});
