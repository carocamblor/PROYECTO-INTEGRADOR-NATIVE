import React, {Component} from "react";
import {View, Text, TextInput, TouchableOpacity} from "react-native";
import { auth, db } from "../../firebase/config";

class CreatePost extends Component{
    constructor(props){
        super(props)
        this.state = {
            postDescription: "",
            post: ""
        }
    }
    

    onSubmit(){
        db.collection("posts").add({
            // username: auth.currentUser.username,      Recordemos que cuando creamos usuarios en el metodo de registro lo hacemos unicamente con email y password
            useremail: auth.currentUser.email,           //En la coleccion de "users", el email de cada usuario aparece como "owner"
            post: this.state.post,
            postDescription: this.state.postDescription, 
            likes: [],
            comentarios: [],
            createdAt: Date.now()
        })

        .then(response => {
            this.setState({
                
            })
        })

        .catch(error => {
            console.log(`El error es ${error}`)
        })
    }

    render(){
        // console.log(auth.currentUser.displayName) // Necesitamos antes haber creado usuarios con nombre de usuario tambien!!!!
        return(
            <View>
                <Text>Add a post</Text>
                <TextInput
                    keyboardType="email-address"
                    placeholder="Tell us something more!"
                    onChangeText={ text => 
                        this.setState({
                            postDescription: text
                        })
                    }
                />

                <TextInput
                    keyboardType="email-address"
                    placeholder="Insert your picture"
                    onChangeText={ text => 
                        this.setState({
                            post: text
                        })
                    }
                />
                <TouchableOpacity onPress={() => this.onSubmit()}>
                    <Text>Post Picture</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

export default CreatePost;