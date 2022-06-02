import React, {Component} from "react";
import {Text, View, Image, TouchableOpacity, StyleSheet} from "react-native"

import { FontAwesome } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons'; 

import {db} from "../firebase/config";


class Post extends Component{
    constructor(props){
        super(props)
        this.state = {
            liked: true,
            likes: 89,
            userInfo: {}
        }
    }

    componentDidMount(){
        db.collection("users").where("owner", "==", this.props.postOwnerEmail).onSnapshot(  //Recordemos que onSnapshot devuelve un array de resultados --> En este caso el array tendra un unico elemento!
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

    }

    unlike(){

    }

    render(){
        console.log(this.state.userInfo)
        return(
            <View style={styles.mainContainer}>
                <View style={styles.smallContainer}>
                    <FontAwesome name="user-circle" size={24} color="white" />
                    <Text style={styles.username}> {this.state.userInfo.username} </Text> 
                </View>
                
                <View style={styles.content}>
                    <Text style={styles.text}> {this.props.postInfo.data.post} </Text>
                </View>
                <Image
                    source={{uri: 'https://i.pinimg.com/474x/74/35/c1/7435c11a830d3599e3791cbae1eba0d8.jpg'}}
                    resizeMode='contain'
                    style={styles.image}
                />
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
                    </View>
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
        paddingHorizontal: 20
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
    interactions: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
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
        width: 200,
        height: 200,
        marginVertical: 10,
        borderRadius: 4
    }

})

export default Post;