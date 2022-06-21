import React, {Component} from "react";
import {View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet} from "react-native";
import OneComment from "../../components/OneComment";

import {db, auth} from "../../firebase/config";
import firebase from "firebase";

import { Feather } from '@expo/vector-icons';


class Comments extends Component{
    constructor(props){
        super(props)
        this.state = {
            newComment: "",
            postComments: []
        }
    }

    componentDidMount(){
        const idDoc = this.props.route.params.id
        db.collection("posts").doc(idDoc).onSnapshot( doc => {
            this.setState({
                postComments: doc.data().comentarios
            })
        })
    }

    createComment(){
        const idDoc = this.props.route.params.id
        const dataComment = {
            owner: auth.currentUser.email,
            comment : this.state.newComment,
            createdAt: Date.now()
        }
        db.collection("posts").doc(idDoc).update({
            comentarios: firebase.firestore.FieldValue.arrayUnion(dataComment)
        })
        .then(response => this.setState({newComment: ""}))
        .catch(error => console.log(error))
        //limpiamos el input
        
    }

    render(){
        console.log("Me volvi a renderizar")
        return(
            <View style={styles.screen}>
                {this.state.postComments.length > 0 ?
                    <FlatList
                        data={this.state.postComments}
                        keyExtractor={item => item.createdAt.toString()}
                        renderItem={({item}) => <OneComment data={item} idPost={this.props.route.params.id} />}
                    /> :
                    <View style={styles.container}><Text style={styles.text}>No comments yet. Be the first to comment.</Text></View>
                }
                <View style={styles.formContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Add a comment"
                        onChangeText={ text => 
                            this.setState({
                                newComment: text 
                            })
                        }
                        value= {this.state.newComment}
                    />
                    {this.state.newComment === '' ?
                        <TouchableOpacity style={styles.inactiveButton}>
                            <Feather name="send" size={24} color="#202020" />
                        </TouchableOpacity> :
                        <TouchableOpacity style={styles.button} onPress={() => this.createComment()}>
                            <Feather name="send" size={24} color="#202020" />
                        </TouchableOpacity>
                    }
                    
                </View>
            </View>
        )
    }
}


export default Comments;

const styles = StyleSheet.create({
    screen: {
        backgroundColor: '#202020',
        flex: 1,
        justifyContent: 'space-between'
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
    formContainer: {
        display: 'flex',
        flexDirection: 'row',
        gap: 20,
        padding: 20,
        borderTopWidth: 1,
        borderTopColor: '#404040',

    },
})