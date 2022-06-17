import React, {Component} from "react";

import {View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Image} from "react-native";

import MyCamera from "../../components/MyCamera";

import { auth, db } from "../../firebase/config";


class CreatePost extends Component{
    constructor(props){
        super(props)
        this.state = {
            postDescription: "",
            tagUsers: [],
            showForm: false,
            imageUrl: "",

            //Manage child state
            showCamera: true,
            pictureAccepted: false
        }
        this.cameraMethods = undefined;
    }
    
    
    onImageUpload(url){
        this.setState({
            showForm: true,
            imageUrl: url,
            pictureAccepted: true
        })
    }

    manageChildCamera(bool){
        bool ?
        this.setState({
            showCamera: false
        }) :
        this.setState({
            showCamera: true
        })
    }

    onSubmit(){
        db.collection("posts").add({
            useremail: auth.currentUser.email,          
            photo: this.state.imageUrl,
            postDescription: this.state.postDescription, 
            likes: [],
            comentarios: [],
            createdAt: Date.now()
        })

        .then(response => {
            this.setState({
                imageUrl: "",                            //Once the picture is posted, we clear the state
                showCamera: true,
                showForm: false,
                pictureAccepted: false                  //Tras postear la imagen reinicio a false el picture accepted    
            })
        })

        .catch(error => {
            console.log(`Error found: ${error}`)
        })
    }

    render(){
        const {navigate} = this.props.navigation
        return(
            <View style={styles.postScreen}>
                
                <View style={styles.titleContainer}>
                    <Text style={styles.postTitle}>Add a Post</Text>
                </View>
                
                    <View style={styles.cameraContainer}>
                        <MyCamera manageChildCamera={(bool) => this.manageChildCamera(bool)} onImageUpload={(url) => this.onImageUpload(url)} showCamera={this.state.showCamera} childImageUri={this.state.childImageUri} pictureAccepted={this.state.pictureAccepted}/>
                    </View> 
                    
                    {this.state.showForm ?
                    <View style={styles.formContainer}>
                        <TextInput
                            style={styles.postInput}
                            keyboardType="email-address"
                            placeholder="Tell us something"
                            onChangeText={text =>
                            this.setState({
                                postDescription: text
                            })}
                        />
                        <TouchableOpacity style={styles.postButton} onPress={() => { 
                                this.onSubmit()
                                navigate("Home")
                            }}>
                            <Text style={styles.buttonText}>Post Picture</Text>
                        </TouchableOpacity>
                    </View> :
                    <></>
                    }                            
            </View> 
        )
    }
}

export default CreatePost;

const styles = StyleSheet.create({
    postScreen:{
        display: "flex",
        alignItems: "center",
        backgroundColor: '#202020',
        flex: 1,
        width: "100%",
    },

    titleContainer: {
        displa: "flex",
        justifyContent: "center",
        width: "80%",
        textAlign: "left",
        flex: 1,
    },

    postTitle: {
        color: 'white',
        fontWeight: 500,
        fontSize: 32,
    },

    cameraContainer: {
        // height: 200,
        width: "80%",
        display: "flex",
        justifyContent: "center",
        flex: 7,
    },
    
    formContainer: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-evenly",
        flex: 3,
        width: "80%"
    },

    postInput: {
        borderWidth: 1,
        padding: 15,
        borderColor: 'white',
        borderStyle: 'solid',
        borderRadius: 6,
        marginVertical: 10,
        color: 'white',
        fontSize: 17,
        width: "100%"
    },

    postButton: {
        backgroundColor: '#03DAC5',
        padding: 13,
        textAlign: 'center',
        borderRadius: 4,
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: '#03DAC5',
        marginVertical: 10,
        width: "80%"
    },

    imageDisplay: {
        // flex: 3
        height: 150
    },

    buttonText: {
        fontSize: 17,
        fontWeight: 'bold'
    }
    
})