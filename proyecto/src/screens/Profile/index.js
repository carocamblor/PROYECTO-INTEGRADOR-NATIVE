import React, {Component} from "react";
import {View, Text, TouchableOpacity, FlatList, Image, StyleSheet} from "react-native"
import Post from "../../components/Post"

import { Feather } from '@expo/vector-icons';

import {db, auth} from "../../firebase/config"

class Profile extends Component{
    constructor(props){
        super(props)
        this.state = {
            userPosts: [],
            loading: true,
            userInfo: {},
            display: "grid"
        }
    }

    componentDidMount(){
        db.collection("posts").where("useremail", "==", auth.currentUser.email).onSnapshot( //todo lo que trae onSnapshot lo trae en forma de array
            docs => {
                let posts = [];
                docs.forEach( doc => {
                    posts.push({
                        id: doc.id,                 //El id lo crea Firebase al crear cada uno de los documentos en nuestra coleccion
                        data: doc.data()
                    })
                })
                this.setState({
                    userPosts: posts,
                    loading: false
                })
            })
        db.collection("users").where("owner", "==", auth.currentUser.email).onSnapshot(
            docs =>{
             
                docs.forEach( doc => {
                 
                    this.setState({
                        userInfo: doc.data()
                    })
                }

                )
            }
        )
    }

    changeDisplay(){
        if (this.state.display === 'grid') {
            this.setState({
                display: 'column'
            })
        } else {
            this.setState({
                display: 'grid'
            })
        }
    }

    sinceLastLogin(){
        let previousLogin = auth.currentUser.metadata.lastSignInTime
        let actualLogin = parseInt(Date.now())

        // -- Math.trunc() se queda con la parte entera de la division -- //
        let seconds = Math.trunc(actualLogin / 1000) 
        let minutes = Math.trunc(seconds / 60)
        let hours = Math.trunc(minutes / 60)
        let days = Math.trunc(hours / 24)
        return days
    }

    render() {
        console.log(this.state.userPosts)
        console.log(auth.currentUser.metadata.lastSignInTime)
        return (
            <View style={styles.screen}>

                <View style={styles.userInfoContainer}>
                    <Text style={styles.userName}>
                        @{this.state.userInfo.username}
                    </Text>
                    <Text>
                        {auth.currentUser.metadata.lastSignInTime}
                        {auth.currentUser.metadata.creationTime}
                    </Text>
                    <Text>
                        {this.state.userPosts.length}
                    </Text>
                </View>

                <View style={styles.displayContainer}>
                    <TouchableOpacity onPress={() => this.changeDisplay()}>
                        {this.state.display === 'grid' ?
                                <Feather name="menu" size={24} color="white" /> :
                                <Feather name="grid" size={24} color="white" />
                        }
                    </TouchableOpacity>
                </View>
                
                <View style={styles.flatListContainer}>
                    { this.state.display === 'grid' ?
                    <View style={styles.flatListGridContainer}>
                        <FlatList
                            style={styles.flatListGrid}
                            data={this.state.userPosts}
                            key={'g'}
                            numColumns={3}
                            keyExtractor={item => item.id.toString()} 
                            renderItem ={({item}) =>
                                <Image
                                    source={{uri: item.data.photo}}
                                    resizeMode="cover"
                                    style={styles.image}
                                />                             
                            }
                        /> 
                    </View>:
                    <View style={styles.flatListColumnContainer}>
                        <FlatList
                            data={this.state.userPosts}
                            key={'c'}
                            keyExtractor={item => item.id.toString()} 
                            renderItem ={({item}) =>
                                <Post navigation={this.props.navigation} postInfo={item} styles={styles}/>
                            }
                        />
                    </View>
                    }
                </View>

                <TouchableOpacity onPress={() => this.props.route.params.logout()}>
                    <Text>Sign out</Text>
                </TouchableOpacity>
            </View>
        )
    }
}


export default Profile;

const styles = StyleSheet.create({
    userInfoContainer: {
        backgroundColor: "pink",
        flex: 2,
        padding: 10
    },
    userName: {
        color: 'white',
        display: 'flex',
        alignItems: 'left',
        fontSize: 17,
        fontWeight: 500,
        display: 'flex',
        flexDirection: 'column'
    },

    displayContainer: {
        flex: 1
    },

    flatListContainer: {
        flex: 10
    },

    flatListGridContainer: {
        flex: 1, 
        backgroundColor: "yellow"
    },

    flatListColumnContainer: {
        flex: 1
    },

    image: {
        width: "33.3333%",
        height: 200,
        padding: 1
    },

    screen: {
        backgroundColor: '#202020',
        flex: 1
      },
})