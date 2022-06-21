import React, {Component} from "react";
import {Text, View, StyleSheet, TouchableOpacity} from "react-native"
import {db, auth} from "../firebase/config";
import { Feather } from '@expo/vector-icons';
import firebase from "firebase";
import moment from "moment"

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
            // this.props.newRender()
            // this.props.deleteComment(dataComment.createdAt)
        }).catch((e) => console.log(e))
    }

    render(){
        const date = moment(this.props.data.createdAt).format("MMMM D, YYYY");
        return(

            <View style={styles.mainContainer}>
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
                <Text style={styles.date}>{date}</Text>
            </View>



        )
    }
}

export default OneComment;

const styles = StyleSheet.create({
    mainContainer: {
        borderBottomWidth: 1,
        borderBottomColor: '#404040',
        borderTopWidth: 1,
        borderTopColor: '#404040',
        paddingVertical: 20,
        paddingHorizontal: 40,
    },
    container: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
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
    date: {
        color: '#808080',
        fontSize: 17,
        display: 'inline',
        flexDirection: 'column',
        marginTop: 5
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