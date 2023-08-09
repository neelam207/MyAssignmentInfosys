import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image, } from 'react-native'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Home({ navigation }) {
  const MOVIE_API = 'https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1'
  const SHOWS_API = 'https://api.themoviedb.org/3/tv/top_rated?language=en-US&page=1'
  const [movies, setmovies] = useState([])
  const [shows, setshows] = useState([])
  const [watchLater, setwatchLater] = useState([])
  const addWatchLater = (item) => {
    console.log("New Item--", item)
    let storeList = JSON.stringify([...watchLater, item])

    setwatchLater([...watchLater, item])
    storeWatchList(storeList)
  }
  const storeWatchList = async (value) => {
    try {
      await AsyncStorage.setItem('my-watch-list', value);
    } catch (e) {
      // saving error
    }
  };
  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('my-watch-list');
      if (value !== null) {
        // value previously stored
        let watchList = JSON.parse(value)
        setwatchLater(watchList)
      }
    } catch (e) {
      // error reading value
    }
  };
  const topMovies = async () => {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5NmNmMjBkZTM1ZDMzZTIwMjJlNzkyOGNkZTE3ZjAxNiIsInN1YiI6IjY0ZDA4ZjhjNmQ0Yzk3MDEwZDUxNjM1OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.hYY4SG37rulJPWPSM4AIxUPrm3lrHE-W-T4rRAQ3pL8'
      }
    };
    let res = await axios.get('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', {
      headers: options.headers
    });

    let data = res.data;
    // console.log(data)
    setmovies([...movies, ...data.results])
  }

  const topShows = async () => {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5NmNmMjBkZTM1ZDMzZTIwMjJlNzkyOGNkZTE3ZjAxNiIsInN1YiI6IjY0ZDA4ZjhjNmQ0Yzk3MDEwZDUxNjM1OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.hYY4SG37rulJPWPSM4AIxUPrm3lrHE-W-T4rRAQ3pL8'
      }
    };
    let res = await axios.get(SHOWS_API, {
      headers: options.headers
    });

    let data = res.data;
    console.log(data)
    setshows([...shows, ...data.results])
  }
  useEffect(() => {
    navigation.setOptions({
      title: "Home",
      headerRight: () => (
        <TouchableOpacity
          onPress={() => navigation.navigate('Search', {
            movies: movies,
            shows: shows,
            addWatchLater: addWatchLater,
            watchLater: watchLater
          })}

        >
          <Image source={require('./res/searchIcon.png')}
            style={{ height: 30, width: 30 }}
          />

        </TouchableOpacity>
      ),
    })
  }, [movies, shows])
  useEffect(() => {
    topMovies()
    topShows()
    navigation.setOptions({
      title: "Home",
      headerRight: () => (
        <TouchableOpacity
          onPress={() => navigation.navigate('Search', {
            movies: movies,
            shows: shows,
            addWatchLater: addWatchLater,
            watchLater: watchLater
          })}

        >
          <Image source={require('./res/searchIcon.png')}
            style={{ height: 30, width: 30 }}
          />

        </TouchableOpacity>
      ),
    })
    getData()
  }, [])
  const renderMovies = ({ item }) => {
    // const isAlreadyInWatchList = watchLater.filter((val) => val.name  ==item.name || val.original_title ==item.name);
    //console.log(isAlreadyInWatchList)
    return (
      <TouchableOpacity style={styles.itemContainer}
        onPress={() => navigation.navigate('Details', {
          imagePath: item.poster_path,
          contentDetail: item.overview,
          item: item,
          addWatchLater: addWatchLater,
          watchLater: watchLater
        })}
      >
        <Text style={styles.movieTitle}>{item.original_title}</Text>
      </TouchableOpacity>
    )
  }

  const renderShows = ({ item }) => {
    const isAlreadyInWatchList = watchLater.filter((val) => val.name == item.name || val.original_title == item.name).length > 0 ? true : false
    // console.warn(isAlreadyInWatchList)
    return (

      <TouchableOpacity style={styles.itemContainer}
        onPress={() => navigation.navigate('Details', {
          imagePath: item.poster_path,
          contentDetail: item.overview,
          item: item,
          addWatchLater: addWatchLater,
          watchLater: watchLater
        })}
      >
        <Text style={styles.movieTitle}>{item.name}</Text>
      </TouchableOpacity>
    )
  }

  const renderWatchLater = ({ item }) => {
    return (
      <View style={styles.itemContainer}>
        <Text style={styles.movieTitle}>{item.name ? item.name : item.original_title}</Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Top Rated Movies</Text>
      <FlatList
        style={styles.flatList}
        horizontal={true}
        keyExtractor={(item, index) => index.toString()}
        data={movies}
        renderItem={renderMovies}
      />


      <Text style={styles.headerText}>Top Rated Shows</Text>

      <FlatList
        style={styles.flatList}
        horizontal={true}
        keyExtractor={(item, index) => index.toString()}
        data={shows}
        renderItem={renderShows}
      />

      <Text style={styles.headerText}>Watch later</Text>

      <FlatList
        style={styles.flatList}
        horizontal={true}
        keyExtractor={(item, index) => index.toString()}
        data={watchLater}
        renderItem={renderWatchLater}
      />
    </View>
  )
}
const styles = StyleSheet.create({
  container: { margin: 10, flexDirection: 'column' },
  headerText: { fontSize: 18, fontWeight: 'bold', marginTop: 10 },
  itemContainer: { margin: 10, borderRadius: 10, width: 110, borderColor: 'grey', height: 70, borderWidth: 1, justifyContent: 'center', alignItems: 'center' },
  movieTitle: { fontSize: 16, textAlign: 'center' },
  flatList: { height: 100, marginTop: 10 }
});