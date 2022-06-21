import React, {Component} from "react";
import {View, Text, TouchableOpacity, FlatList, Image, StyleSheet, ActivityIndicator} from "react-native"
import Post from "../../components/Post"

import { Feather } from '@expo/vector-icons';

import {db, auth} from "../../firebase/config"

import moment from "moment";

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
        const lastSignIn = moment(auth.currentUser.metadata.lastSignInTime)
        const now = moment()
        const session = now.diff(lastSignIn, 'minutes')
        const creationTime = moment(auth.currentUser.metadata.creationTime).format('MMMM D, YYYY')
        // console.log(this.state.userPosts)
        // console.log(auth.currentUser.metadata.lastSignInTime)
        return (
            <View style={styles.screen}>

                {this.state.loading ?
                    <ActivityIndicator size='small' color='white'/>
                    :

                    <View>

                        <View style={styles.top}>
                            <View style={styles.userInfoContainer}>
                                <Text style={styles.userName}>
                                    @{this.state.userInfo.username}
                                </Text>
                                <Text style={styles.text}>
                                    You have been in session for {session} minutes.
                                </Text>
                                <Text style={styles.text}>
                                    Joined: {creationTime}
                                </Text>
                                <Text style={styles.text}>
                                    Posts: {this.state.userPosts.length}
                                </Text>
                                <TouchableOpacity onPress={() => this.props.route.params.logout()}>
                                    <Feather name="log-out" size={20} color="white" />
                                </TouchableOpacity>
                            </View>

                            {this.state.userPosts.length > 0 ?
                                <TouchableOpacity style={styles.button} onPress={() => this.changeDisplay()}>
                                    {this.state.display === 'grid' ?
                                            <Feather name="menu" size={24} color="white" /> :
                                            <Feather name="grid" size={24} color="white" />
                                    }
                                </TouchableOpacity> :
                            <></>}
                    
                        </View>

                        {this.state.userPosts.length === 0 ?

                            <Text style={styles.noPosts}>No posts yet.</Text> :

                            <View style={styles.mainContainer}>
                        
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
                            </View>
                        }

                    </View>

                }
            </View>
        )
    }
}


export default Profile;

const styles = StyleSheet.create({
    userInfoContainer: {
        flex: 1,
        padding: 10
    },
    mainContainer: {
        flex: 5
    },

    userName: {
        color: 'white',
        display: 'flex',
        alignItems: 'left',
        fontSize: 17,
        fontWeight: 500,
        display: 'flex',
        flexDirection: 'column',
        fontSize: 17
    },

    top: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },

    button: {
        padding: 10
    },

    flatListContainer: {
        flex: 10
    },

    flatListGridContainer: {
        flex: 1, 
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

    noPosts: {
        color: 'white',
        flex: 5,
        fontSize: 17,
        padding: 10
    },
    text: {
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        fontSize: 17
    },
})