import { View, Text, TextInput,StyleSheet, FlatList,TouchableOpacity } from 'react-native'
import React,{useState} from 'react'


export default function Search({route,navigation}) {
    const [text, setText] = useState('');
    const [searchedArr, setSearchedArr] = useState([])
    const renderItem = ({item}) => {
        return (
            <TouchableOpacity style={styles.itemContainer}
            onPress={()=>navigation.navigate('Details',{
                imagePath:item.poster_path,
                contentDetail:item.overview,
                item: item,
                addWatchLater: route.params.addWatchLater,
                watchLater: route.params.watchLater
              })}
            >
                <Text style={styles.movieTitle}>{item.name ? item.name : item.original_title}</Text>
                <Text>{'>'}</Text>
            </TouchableOpacity>
        )
    }
    const separator = () => {
        return <View style={{height: 1, backgroundColor: 'grey'}}></View>
    }
    const onSearch = (text) => {
        setText(text)
        console.log(route)
       const movies = route.params.movies.filter((item) => item.original_title.includes(text))
        const shows = route.params.shows.filter((item) => item.name.includes(text))
        setSearchedArr([...movies,...shows])
    }
  return (
    <View>
      <TextInput 
       style={styles.input}
       value={text}
       onChangeText={(text) => onSearch(text)}
       placeholder='Search by movie or show name'
      />
      <FlatList
        keyExtractor={(item, index) => index.toString()}
        data={searchedArr}
        renderItem={renderItem}
        ItemSeparatorComponent={separator}
      />
    </View>
  )
}
const styles = StyleSheet.create({
    input: {
      height: 50,
      margin: 12,
      borderWidth: 1,
      padding: 10,
      borderRadius:10
    },
    movieTitle: { fontSize: 16, textAlign: 'center' },
    itemContainer: {height: 50, alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row', paddingHorizontal: 10, margin: 5 }
  });