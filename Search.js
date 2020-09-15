import React ,{ useState } from 'react'
import {View ,Text ,StyleSheet ,TextInput ,Image ,ScrollView ,TouchableHighlight ,Modal} from 'react-native'
import axios from 'axios'

function App () {

    const apiurl = "https://api.themoviedb.org/3/search/multi?api_key=64472fbe2bab6a0e818cdf8672193431";

    const [state ,setState] = useState({
        s: '',
        results: [],
        selected: {}
    })

    const search = () => {
        axios(apiurl + "&query=" + state.s).then(({data}) => {
            let results = data.results;
            console.log(results)
            if(results != undefined) 
            {
                setState(prevState => {
                    return{...prevState ,results: results}
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
            <View>
                <TextInput 
                    style = {styles.search}
                    onChangeText = {text => setState(prevState => {
                        return {...prevState ,s:text}
                    })}
                    placeholder = 'Enter a movie...'
                    
                    onSubmitEditing = {search}
                    
                />
            </View>
            
            

            <ScrollView style = {styles.app}>

                <Text style ={styles.number}>TV SHOWS & MOVIES: {state.results.length}</Text>

                <View style = {styles.content}>
                {state.results.map(result => {
                    return(
                        <TouchableHighlight 
                            key={result.id} 
                            onPress={() => openPopup(result.id)}
                        >
                            <View >

                                <Image 
                                    source = {{ uri: "https://image.tmdb.org/t/p/w500" + result.poster_path}}
                                    style = {{
                                        width: 114,
                                        height: 180,
                                        marginBottom:8,
                                        marginLeft: 2,
										marginRight: 2,
										background:'black'
                                    }}
                                    alt = {result.title}
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
      backgroundColor: '#171717',
      color: 'white'
    },
    search: {
      width: '100%',
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