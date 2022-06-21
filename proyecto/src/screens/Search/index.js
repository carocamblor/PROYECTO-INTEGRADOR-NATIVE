import React, {Component} from "react";
import {View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList} from "react-native"
import { Feather } from '@expo/vector-icons';
import {db} from "../../firebase/config";
import Post from "../../components/Post";


class Search extends Component{
    constructor(props){
        super(props)
        this.state = {
            searchText: "",
            posts1: [],
            posts2: [],
            filteredPosts: [],
            didSearch: false
        }
    }

    componentDidMount(){
        db.collection("posts").onSnapshot(
            docs => {
                let posts = [];
                docs.forEach( doc => {
                    posts.push({
                        id: doc.id,
                        data: doc.data()
                    })
                })
                this.setState({
                    posts2: posts
                })
            }
        )
    }

    manageSearch(searchInput){
        let posts = this.state.posts2;
        let postsFiltered = [] 
        
        if (searchInput != ""){
            postsFiltered = posts.filter(function(post){
                return post.data.useremail.toLowerCase().includes(searchInput.toLowerCase())
            })
        }
        
        this.setState({
            filteredPosts: postsFiltered
        })  
    }

    render(){
        return(
            <View style={styles.screen}>
                <View style={styles.formContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder=""
                        onChangeText={ text =>
                            this.setState({
                                searchText: text
                            },
                            () => {
                                this.manageSearch(text)})
                        }
                        value= {this.state.searchText}
                    />
                </View>
                <View style={styles.resultsContainer}>
                    <FlatList
                            data={this.state.filteredPosts}
                            keyExtractor={item => item.id.toString()} 
                            renderItem ={({item}) =>
                                <Post navigation={this.props.navigation} postInfo={item} styles={styles}/>
                            }
                        />
                </View>
            </View>
    )
    }
}
const styles = StyleSheet.create({
    screen: {
        backgroundColor: '#202020',
        flex: 1,
        justifyContent: 'space-between'
    },

    formContainer: {
        display: 'flex',
        flexDirection: 'row',
        gap: 20,
        padding: 20,
        borderTopWidth: 1,
        borderTopColor: '#404040',
    },

    resultsContainer: {
        flex: 1
    },

    container: {
        display: 'flex',
        flexDirection: 'row',
        gap: 10,
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#404040',
    },

    text: {
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        fontSize: 17,
        display: 'flex',
        flexDirection: 'column'
    },

    username: {
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        fontSize: 17,
        fontWeight: 500,
        display: 'flex',
        flexDirection: 'column'
    },

    input: {
        borderWidth: 1,
        padding: 15,
        borderColor: 'white',
        borderStyle: 'solid',
        borderRadius: 6,
        marginVertical: 10,
        color: 'white',
        fontSize: 17,
        flex: 6
    },

    button: {
        backgroundColor: '#03DAC5',
        padding: 13,
        textAlign: 'center',
        borderRadius: 4,
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: '#03DAC5',
        marginVertical: 10,
    },

    inactiveButton: {
        opacity: 0.5,
        backgroundColor: '#03DAC5',
        padding: 13,
        textAlign: 'center',
        borderRadius: 4,
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: '#03DAC5',
        marginVertical: 10,
    },
})
export default Search;