import React ,{ useState } from 'react'
import {View ,Text ,StyleSheet ,TextInput ,Image ,ScrollView ,Vibration,TouchableHighlight ,Modal ,ActivityIndicator} from 'react-native'
import axios from 'axios'

function App () {

    const apiurl = "http://www.omdbapi.com/?apikey=c6e51ca1";

    const [state ,setState] = useState({
        s: '',
        results: [],
        selected: {},
        loading: false
    })

    const search = () => {
        axios(apiurl + "&s=" + state.s).then(({data}) => {
            let results = data.Search;
            console.log(results)
            if(results != undefined) 
            {
                setState(prevState => {
                    return{...prevState ,results: results ,loading: false}
                })
            }    
        })
    }

    const openPopup = id => {
        const api = "http://api-public.guidebox.com/v2/movies/";
        axios(api + id + "?api_key=88e781f12a2de2771d277909c4febdabb61eef6b").then(({ data }) => {
          let result = data.subscription_android_sources;
          console.log(result)
      
          setState(prevState => {
            return{...prevState,selected:result }
          });
        });
      }

    return (
        <View style={styles.container}>
            <View style = {styles.textInput}>
                <TextInput 
                    style = {styles.search}
                    onChangeText = {text => setState(prevState => {
                        return {...prevState ,s:text ,loading:true}
                    })}
                    placeholder = 'Enter a movie...'
                    placeholderTextColor = 'grey'

                    onSubmitEditing = {search}

                    autoFocus = {true}
                    selectTextOnFocus = {true}
                    showSoftInputOnFocus = {true}
                    maxLength = {40}

                />
                
                <ActivityIndicator 
                    
                    size = 'small'
                    color = 'red'
                    animating = {state.loading}
                />
                
               
            </View>
            
            

            <ScrollView style = {styles.app}>

                <Text style ={styles.number}>TV SHOWS & MOVIES: {state.results.length}</Text>

                <View style = {styles.content}>
                {state.results.map(result => {
                    return(
                        <TouchableHighlight 
                            key={result.imdbID} 
                            onPress={() => Vibration.vibrate()}
                        >
                            <View >

                                <Image 
                                    source = {{ uri: result.Poster}}
                                    style = {{
                                        width: 114,
                                        height: 180,
                                        marginBottom:8,
                                        marginLeft: 2,
										marginRight: 2
                                    }}
                                    alt = {result.Title}
                                    
                                />
                                
                            </View>
                        </TouchableHighlight>
                    )
                     })}
                </View>
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
    )
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'black',
      color: 'white',
    },
    textInput: {
      width: '100%',
      color: 'white',
      backgroundColor: '#2e2e2e',
      display: 'flex',
      flexDirection: 'row'
    },
    search: {
      width: '90%',
      color: 'white',
      backgroundColor: '#2e2e2e',
    },
    number:{
        color:'white',
        fontSize: 16,
        fontWeight: '700',
        margin: 20,
        marginLeft:0
    },
    content: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap'
    }
})

export default App