import React, { useState } from 'react';
import {StyleSheet, Text, TextInput, View, ScrollView,Image,TouchableHighlight,Modal } from 'react-native';
import axios from 'axios'

function Eikona() {
  const apiurl = "http://www.omdbapi.com/?apikey=c6e51ca1";
  const [state, setState] = useState({
    s:'',
    results: [],
    selected: {}
  });

const search = () => {
    axios(apiurl + "&s=" + state.s).then(({ data }) => {
      let results = data.Search
      if(results!=undefined){
        setState(prevState => {
          return {...prevState,results:results}
        })
      }
     
})
}


const openPopup = id => {
  axios(apiurl + "&i=" + id).then(({ data }) => {
    let result = data;
    console.log(result)

    setState(prevState => {
      return{...prevState,selected:result }
    });
  });
}

  return (
    <View style={styles.container}>
      
       <Text style={styles.title}>Eikona</Text> 
       <TextInput 
          style={styles.search}
          onChangeText={text => setState(prevState => {
            return {...prevState, s:text}
          })}
          onChange={search}
          onSubmitEditing={search}
          value={state.s}
          placeholder='Enter a movie...'
       />
       
        <ScrollView style={styles.results}>
        {state.results.map(result => {
          return(
            <TouchableHighlight 
              key={result.imdbID} 
              onPress={() => openPopup(result.imdbID)}

            >
              <View style={styles.result}>
                <Image 
                  source={{ uri: result.Poster }}
                  style={{
                    width: '100%',
                    height: 300
                  }}
                />
                <View>
                  <Text style={styles.heading}>{result.Title} - {result.Year}</Text>
                </View>
              </View>
            </TouchableHighlight>
          )})}           
          </ScrollView>
      

      <Modal
        animationType='fade'
        transparent={false}
        visible={(typeof state.selected.Title != 'undefined')}
      >
          <View style = {styles.popup}>
            <Text style = {styles.poptitle}>{state.selected.Title}</Text>
            <Image 
              source={{uri:state.selected.Poster}} 
              style={{
                      width: 150,
                      height: 200
                    }}
            />
            <Text style={{fontWeight:'700'}}>{state.selected.Year}</Text>
            <Text style = {{marginBottom: 10}}>IMDB Rating: {state.selected.imdbRating}</Text>
            <Text style = {{marginBottom: 10}}>Genre: {state.selected.Genre}</Text>
            <Text>Cast: {state.selected.Actors}</Text>
            <Text style = {{marginTop:20}}>{state.selected.Plot}</Text>
          </View>
          
          <TouchableHighlight
            onPress = {() => setState(prevState => {
              return {...prevState, selected: {} }
            })}
          >
            <Text style={styles.closebtn}>Close</Text>
          </TouchableHighlight>

      </Modal>
    </View> 
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#223343',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 20
  },
  title: {
    color:'#FFF',
    fontSize: 32,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 20
  },
  search: {
    fontSize: 15 ,
    fontWeight: '300',
    width: '100%',
    paddingLeft:20,
    backgroundColor: '#FFF',
    borderRadius: 8,
    marginBottom: 40
  },
  results: {
    flex: 1,
  },
  result :{
    flex:1,
    width: '100%',
    marginBottom: 20
  },
  heading: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '700',
    padding: 20,
    backgroundColor: '#445565'
  },
  popup: {
    padding: 20
  },
  poptitle: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 5,
  },
  closebtn: {
    padding: 15,
    fontSize: 20,
    fontWeight: '700',
    backgroundColor:'#445565'
  }
})

export default Eikona
