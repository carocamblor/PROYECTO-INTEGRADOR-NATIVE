import React, {Component} from "react";
import {View, Text, TextInput, TouchableOpacity, FlatList} from "react-native";
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

    onSubmit(){
        const idDoc = this.props.route.params.id
        const dataComment = {
            owner: auth.currentUser.email,
            comment : this.state.newComment,
            createdAt: Date.now()
        }
        db.collection("posts").doc(idDoc).update({
            comentarios: firebase.firestore.FieldValue.arrayUnion(dataComment)
        })
        this.setState({
            newComment: ""
        })
    }

    render(){
        console.log(this.props)
        return(
            <View>
                <Text>Screen Comentarios</Text>
                <FlatList
                    data={this.state.postComments}
                    keyExtractor={item => item.createdAt.toString()}
                    renderItem={({item}) => <Text>{item.comment}</Text> }
                />
                <View>
                    <TextInput
                        placeholder="Ingrese Comentario"
                        onChangeText={ text => 
                            this.setState({
                                newComment: text 
                            })
                        }
                        value= {this.state.newComment}
                    />
                    <TouchableOpacity onPress={() => this.onSubmit()}>
                        <Feather name="send" size={24} color="black" />
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}


export default Comments;