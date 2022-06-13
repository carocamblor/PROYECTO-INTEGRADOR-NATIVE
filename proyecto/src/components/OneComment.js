import React, {Component} from "react";
import {Text, View, StyleSheet, TouchableOpacity} from "react-native"
import {db, auth} from "../firebase/config";
import { Feather } from '@expo/vector-icons';
import firebase from "firebase";

class OneComment extends Component{
    constructor(props){
        super(props)
        this.state = {
            username: ''
        }
    }

    componentDidMount(){
        const comment = this.props.data
        // Buscamos el username del dueño del comentario
        db.collection("users").where("owner", "==", comment.owner).onSnapshot(
            docs => {
                docs.forEach( doc => {
                    this.setState({
                        username: doc.data().username
                    })
                })
            }
        )  
    }

    deleteComment(){
        const idDoc = this.props.idPost
        const dataComment = this.props.data
        db.collection("posts").doc(idDoc).update({
            comentarios: firebase.firestore.FieldValue.arrayRemove(dataComment)
        }).then(() => {
            this.props.newRender()
            // this.props.deleteComment(dataComment.createdAt)
        }).catch((e) => console.log(e))
    }

    render(){
        return(
            <View style={styles.container}>
                <View style={styles.miniContainer}>
                    <Text style={styles.username}>@{this.state.username}</Text>
                    <Text style={styles.text}>{this.props.data.comment}</Text>
                </View>
                {auth.currentUser.email === this.props.data.owner ?
                    <TouchableOpacity onPress={() => this.deleteComment()}>
                        <Feather name="trash-2" size={20} color="white" />
                    </TouchableOpacity> :
                    <></>
                }
                
            </View>
        )
    }
}

export default OneComment;

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 20,
        paddingHorizontal: 40,
        borderBottomWidth: 1,
        borderBottomColor: '#404040',
        borderTopWidth: 1,
        borderTopColor: '#404040',
    },
    miniContainer: {
        display: 'inline',
    },
    text: {
        with: 'fit-content',
        color: 'white',
        fontSize: 17,
        display: 'inline',
        flexDirection: 'column'
    },
    username: {
        width: 'fit-content',
        color: 'white',
        display: 'inline',
        fontSize: 17,
        fontWeight: 500,
        flexDirection: 'column',
        marginRight: 8
    }
})