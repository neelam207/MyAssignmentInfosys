import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native'
import React,{useEffect, useState} from 'react'

export default function Details({route,}) {
        let imageuri="https://image.tmdb.org/t/p/original"+route.params.imagePath;
    //console.warn(route.params)
    const [isSelected, setisSelected] = useState(false)
    const [saveText, setsaveText] = useState('Save to watch lated')
    

    const addToWatchLater = () =>{
        
            setisSelected(true)
           route.params.addWatchLater(route.params.item)
          //  setsaveText('Saved to watch later')
    }
    useEffect(()=>{
        const isAlreadyInWatchList= route.params.watchLater.filter((val) => val.id == route.params.item.id).length
        if(isAlreadyInWatchList) setisSelected(true)
    },[])
    return (
    <View>
        <Image 
         source={{
            uri: imageuri,
          }}
          style={{height:300,width:370,margin:8}}
        />
    <TouchableOpacity><Text style={{color:!isSelected ?'red':'green',fontSize:18,paddingLeft:15}}
    onPress={!isSelected ? addToWatchLater :null}
    >{isSelected ? 'Saved to Watch later' : '+ Save to watch later'} </Text></TouchableOpacity>
    <Text style={{padding:10,fontSize:18}}>{route.params.contentDetail}</Text>
  
    </View>
  )
}