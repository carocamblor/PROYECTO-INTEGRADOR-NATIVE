import React, {Component} from "react";
import { View, Text, TextInput, Image, TouchableOpacity, StyleSheet } from "react-native";

import { Camera } from "expo-camera";

class MyCamera extends Component{
    constructor(props){
        super(props)
        this.state = {
            permission: false,
            showCamera: true,   
            imageUri: ""
        }
        this.cameraMethods = undefined
    }

    componentDidMount(){
        Camera.requestCameraPermissionsAsync()
        .then( response => {
            this.setState({
                permission: true
            })
        })
        .catch(error => {
            console.log(`Error en la solicitud de permiso a la camara: ${error}`)
        })
    }

    takePicture(){
        this.cameraMethods.takePictureAsync()
        .then(photo => {
            console.log(photo)
            this.setState({
                imageUri: photo.uri,
                showCamera: false                 //Tras tomar la imagen ocultamos la camara ya que vamos a querer ver la foto tomada
            })
        })
    }

    render(){
        return(
            <View style={styles.container}>
                {this.state.permission ?
                    this.state.showCamera ?
                        <>
                            <Camera
                                style={styles.cameraBody}
                                type={Camera.Constants.Type.back}
                                ref={cameraMethods => this.cameraMethods = cameraMethods}
                                takePicture = {() => this.takePicture()}
                            />
                            <View style={styles.formContainer}>
                                <TextInput
                                    style={styles.postInput}
                                    keyboardType="email-address"
                                    placeholder=""
                                    onChangeText={text =>
                                    this.setState({
                                        postDescription: text
                                    })}
                                />

                                <TouchableOpacity style={styles.postButton} onPress={() => this.takePicture()}>
                                    <Text style={styles.buttonText}>Post Picture</Text>
                                </TouchableOpacity>
                            </View>
                        </> :
                        <>
                            <Image
                                style={styles.imageDisplay}
                                source={{uri:this.state.imageUri}}
                            />
                        </>
                :
                <Text>No tienes acceso a la camara</Text>    
                }   
            </View>
               
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: "flex",
        justifyContent: "center"
    },

    cameraBody: {
        flex: 3,
    },

    formContainer: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-evenly",
        flex: 1,
        width: "100%"
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
        height: 400
    }
    
})

export default MyCamera