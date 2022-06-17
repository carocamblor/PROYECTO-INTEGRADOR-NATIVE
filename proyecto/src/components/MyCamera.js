import React, {Component} from "react";
import { View, Text, TextInput, Image, TouchableOpacity, StyleSheet } from "react-native";

import { Camera } from "expo-camera";
import { storage, auth } from "../firebase/config";

class MyCamera extends Component{
    constructor(props){
        super(props)
        this.state = {
            permission: false,
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
            this.setState({
                imageUri: photo.uri,
            },
            () => this.props.manageChildCamera(true)) //De esta manera oculto la camara
        })
    }

    acceptPicture(){
        fetch(this.state.imageUri)
            .then(response => response.blob())
            .then( image => {
                const reference = storage.ref(`/userPictures/${auth.currentUser.email}/${Date.now()}.jpg`)
                reference.put(image)                            //put() --> Uploads data to this reference's location   
                .then(() => {
                        reference.getDownloadURL()              //.getDownloadURL() --> Fetches a long lived download URL for this object. It works as a promise that returns the URL if found
                            .then(url => {                      //Conseguimos al URL publica de la imagen para juntarla con el resto de datos del posteo 
                                this.props.onImageUpload(url)   //El metodo que llega por props permite cambiar el estado del componente padre
                            })
                    })
            })
            .catch(error => {
                console.log(`Error found: ${error}`)
            })
    }

    discardPicture(){
        this.setState({
            imageUri: "",
            showCamera: true
        })
        this.props.manageChildCamera(false)
    }

    render(){
        return(
            <View style={styles.container}>
                {this.state.permission ?
                    this.props.showCamera ?
                        <>
                            <Camera
                                style={styles.cameraBody}
                                type={Camera.Constants.Type.back}
                                ref={cameraMethods => this.cameraMethods = cameraMethods}
                            />
                            <View style={styles.formContainer}>
                                <TouchableOpacity style={styles.postButton} onPress={() => this.takePicture()}>
                                    <Text style={styles.buttonText}>Take Picture</Text>
                                </TouchableOpacity>
                            </View>
                        </> 
                        :
                        this.props.pictureAccepted ?
                            <>
                                <Image
                                    style={styles.imageDisplayPost}
                                    source={{uri:this.state.imageUri}} //Por que antes tomabamos la URI desde props?
                                />
                            </>
                            :
                            <>
                                <Image
                                    style={styles.imageDisplay}
                                    source={{uri:this.state.imageUri}}
                                />
                                <View style={styles.imageOptions}>
                                    <TouchableOpacity style={styles.acceptPhoto} onPress={() => this.acceptPicture()}>
                                        <Text>Accept</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity style={styles.discardPhoto} onPress={() => this.discardPicture()}>
                                        <Text>Discard</Text>
                                    </TouchableOpacity>
                                </View>
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
        justifyContent: "center",
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

    imageDisplayContainer: {
        display: "flex",
        flex: 1,
        backgroundColor: "yellow",
    },

    imageDisplayPost: {
        flex: 2,
        backgroundColor: "red"
    },

    imageDisplay: {
        flex: 3
    },

    imageOptions: {
        flex: 1,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center"
    },
    acceptPhoto: {
        display: "flex",
        justifyContent: "center",
        textAlign: 'center',
        width: "40%",
        height: 40,
        borderRadius: 4,
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: '#03DAC5',
        marginVertical: 10,
        backgroundColor: '#98FB98'
    },
    discardPhoto: {
        display: "flex",
        justifyContent: "center",
        textAlign: 'center',
        width: "40%",
        height: 40,
        borderRadius: 4,
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: '#03DAC5',
        marginVertical: 10,
        backgroundColor: '#DC143C'
    }
})

export default MyCamera