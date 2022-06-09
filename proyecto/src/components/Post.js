import React, {Component} from "react";
import {Text, View, Image, TouchableOpacity, StyleSheet, FlatList} from "react-native"

import { FontAwesome } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons'; 

import {db, auth} from "../firebase/config";
import firebase from "firebase";



class Post extends Component{
    constructor(props){
        super(props)
        this.state = {
            liked: false,
            likes: 0,
            comments: [],
            userInfo: {}
        }
    }

    componentDidMount(){
        const post= this.props.postInfo.data
        const currentUser = auth.currentUser
        console.log(post)
        if (post.likes.includes(currentUser.email)) {
            this.setState({liked:true}) 
        }

        const cantidadDeLikes = post.likes.length
        this.setState({
            likes: cantidadDeLikes
        })

        const comments = post.comentarios
        this.setState({
            comments: comments
        })

        db.collection("users").where("owner", "==", post.useremail).onSnapshot(  //Recordemos que onSnapshot devuelve un array de resultados --> En este caso el array tendra un unico elemento!
            docs => {
                docs.forEach( doc => {
                    this.setState({
                        userInfo: doc.data()   //Como el array que devuelve onSnapshot tiene un unico elemento, es decir, la info de un cierto usuario, cargamos esta info en el estado directamente
                    })
                })
            }
        )  
    }

    like(){
        const documento = this.props.postInfo
        const emailCurrentUser = auth.currentUser.email

        db.collection("posts").doc (documento.id).update({
            likes: firebase.firestore.FieldValue.arrayUnion(emailCurrentUser)
        }).then ( response => this.setState( {liked: true , likes : this.state.likes +1 }))
        .catch(e=> console.log(e))
    }

    unlike(){
        const documento = this.props.postInfo
        const emailCurrentUser = auth.currentUser.email

        db.collection("posts").doc (documento.id).update({
            likes: firebase.firestore.FieldValue.arrayRemove(emailCurrentUser)
        }).then ( response => this.setState( {liked: false , likes : this.state.likes -1 }))
        .catch(e=> console.log(e))
    }

    render(){
        console.log(this.state.comments)
        return(
            <View style={styles.mainContainer}>
                <View style={styles.userInfo}>
                    <FontAwesome name="user-circle" size={24} color="white" />
                    <Text style={styles.username}> {this.state.userInfo.username} </Text> 
                </View>
                
                <View style={styles.imageContainer}>
                    <Image
                        source={{uri: 'https://i.pinimg.com/474x/74/35/c1/7435c11a830d3599e3791cbae1eba0d8.jpg'}}
                        resizeMode='contain'
                        style={styles.image}
                    />
                </View>
                
                <View style={styles.interactions}>
                    <View style={styles.smallContainer}>
                        {this.state.liked ?
                        <TouchableOpacity onPress={() => this.unlike()}>
                            <Ionicons name="heart-sharp" size={24} color="#ef476f" />
                        </TouchableOpacity> :
                        <TouchableOpacity onPress={() => this.like()}>
                            <Ionicons name="heart-outline" size={24} color="#ef476f" />
                        </TouchableOpacity>}
                        <Text style={styles.text}>{this.state.likes}</Text>
                    </View>

                    <View style={styles.smallContainer}>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate("Comments", {id: this.props.postInfo.id})}>
                            <MaterialCommunityIcons name="comment-outline" size={22} color="white" />
                        </TouchableOpacity>
                        <Text style={styles.text}>{this.props.postInfo.data.comentarios.length}</Text>
                    </View>
                </View>

                <View style={styles.commentContainer}>
                    <Text>Agregar comentarios</Text>
                    <FlatList
                        data={this.state.comments}
                        keyExtractor={item => item.createdAt.toString()}
                        renderItem={({item})=>
                            <Text>{item.comment}</Text>
                    }
                    />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    mainContainer: {
        borderBottomWidth: 1,
        borderBottomColor: '#404040',
        display: 'flex',
        paddingVertical: 20,
        paddingHorizontal: 20,
        flex: 1
    },

    userInfo: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: "center",
        gap: 5,
        flex: 5,
    },

    imageContainer: {
        display:"flex",
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 20
    },

    interactions: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: "space-evenly",
        flex: 5,
    },

    text: {
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        fontSize: 17
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
    
    smallContainer: {
        display: 'flex',
        flexDirection: 'row',
        gap: 5,
    },

    content: {
        marginTop: 10
    },

    image: {
        width: 400,
        height: 400,
        borderRadius: 4,
        backgroundColor: "green"
    }

})

export default Post;