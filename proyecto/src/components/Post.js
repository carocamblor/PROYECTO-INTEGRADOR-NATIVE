import React, {Component} from "react";
import {Text, View, Image, TouchableOpacity, StyleSheet, FlatList} from "react-native"

import OneComment from "./OneComment";

import { FontAwesome } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons'; 
import { Feather } from '@expo/vector-icons';

import {db, auth} from "../firebase/config";
import firebase from "firebase";


class Post extends Component{
    constructor(props){
        super(props)
        this.state = {
            liked: false,
            likes: 0,
            userInfo: {}
        }
    }

    componentDidMount(){
        const idPost = this.props.postInfo.id
        const post= this.props.postInfo.data
        const currentUser = auth.currentUser
        
        if (post.likes.includes(currentUser.email)) {
            this.setState({liked:true}) 
        }

        const cantidadDeLikes = post.likes.length
        this.setState({
            likes: cantidadDeLikes
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
        const document = this.props.postInfo
        const emailCurrentUser = auth.currentUser.email

        db.collection("posts").doc (document.id).update({
            likes: firebase.firestore.FieldValue.arrayUnion(emailCurrentUser)
        }).then ( response => this.setState( {liked: true , likes : this.state.likes +1 }))
        .catch(e=> console.log(e))
    }

    unlike(){
        const document = this.props.postInfo
        const emailCurrentUser = auth.currentUser.email

        db.collection("posts").doc (document.id).update({
            likes: firebase.firestore.FieldValue.arrayRemove(emailCurrentUser)
        }).then ( response => this.setState( {liked: false , likes : this.state.likes -1 }))
        .catch(e=> console.log(e))
    }

    deletePost(){
        const document = this.props.postInfo
        db.collection("posts").doc(document.id).delete()
        .then(() => console.log("Imagen eliminada"))
    }

    render(){
        const postAuthor = this.props.postInfo.data.useremail
        return(
            <View style={styles.mainContainer}>
                <View style={styles.userInfo}>
                    <FontAwesome name="user-circle" size={24} color="white" />
                    <Text style={styles.username}> {this.state.userInfo.username} </Text> 
                    {postAuthor == auth.currentUser.email ?
                    <TouchableOpacity onPress={() => this.deletePost()}>
                        <Feather name="trash-2" size={20} color="white" />
                    </TouchableOpacity> :
                    <></>
                    }
                </View>

                <View style={styles.imageContainer}>
                    <Image
                        source={{uri: this.props.postInfo.data.photo}}
                        resizeMode="cover"
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

                <View style={styles.captionContainer}>
                    <Text style={styles.captionText}>{this.props.postInfo.data.postDescription}</Text>
                </View>

                <View style={styles.commentContainer}>
                    <FlatList
                        data={this.props.postInfo.data.comentarios.slice(0,2)}
                        keyExtractor={item => item.createdAt.toString()}
                        renderItem={({item})=>
                            <OneComment data={item} idPost={this.props.postInfo.id} deleteComment={()=>this.deleteComment()} newRender={() => this.props.newRender()}/>
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
        paddingTop: 20,
        // paddingHorizontal: 20,
        flex: 1
    },

    userInfo: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: "center",
        gap: 5,
        flex: 5,
        paddingLeft: 20
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
        paddingBottom: 20
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
    },

    captionContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: "center",
        gap: 5,
        flex: 5,
        paddingLeft: 20,
        paddingVertical: 20
    },

    captionText: {
        width: 'fit-content',
        color: 'white',
        display: 'inline',
        fontSize: 17,
        flexDirection: 'column',
        marginRight: 8
    }
})

export default Post;