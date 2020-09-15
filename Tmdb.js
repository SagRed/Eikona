import React ,{ useState } from 'react'
import {View ,Text ,StyleSheet ,TextInput ,Image ,ScrollView ,TouchableHighlight} from 'react-native'
import axios from 'axios'

function App () {

    const apiurl = "http://api-public.guidebox.com/v2/search?api_key=88e781f12a2de2771d277909c4febdabb61eef6b&type=movie";

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
                            <View>
                            
                                <Image 
                                    source = {{ uri: result.poster_240x342}}
                                    style = {{
                                        width: 114,
                                        height: 180,
                                        marginBottom:8,
                                        marginLeft: 2,
                                        marginRight: 2
                                    }}
                                    alt = {result.title}
                                />
                                
                            </View>
                        </TouchableHighlight>
                    )
                     })}
                </View>
            </ScrollView>

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