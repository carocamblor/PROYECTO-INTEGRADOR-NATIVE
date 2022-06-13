import React, {Component} from "react";
import {Text, View, StyleSheet} from "react-native"
import {db} from "../firebase/config";


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

    render(){
        return(
            <View style={styles.container}>
                <Text style={styles.username}>@{this.state.username}</Text>
                <Text style={styles.text}>{this.props.data.comment}</Text>
            </View>
        )
    }
}

export default OneComment;

const styles = StyleSheet.create({
    container: {
        display: 'inline',
        paddingVertical: 20,
        paddingHorizontal: 40,
        borderBottomWidth: 1,
        borderBottomColor: '#404040',
        borderTopWidth: 1,
        borderTopColor: '#404040',
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