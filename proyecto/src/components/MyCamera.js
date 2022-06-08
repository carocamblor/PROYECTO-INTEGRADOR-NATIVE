import React, {Component} from "react";
import { View, Text, StyleSheet } from "react-native";

import { Camera } from "expo-camera";

class MyCamera extends Component{
    constructor(props){
        super(props)
        this.state = {
            permission: false
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

    render(){
        return(
            <View>
                {this.state.permission ?
                <View style={styles.container}>
                    <Camera
                        style={styles.cameraBody}
                        type={Camera.Constants.Type.back}
                        ref={cameraMethods => this.cameraMethods = cameraMethods}
                    />
                </View> :
                <Text>No tienes acceso a la camara</Text>    
                }   
            </View>
               
        )
    }

}

const styles = StyleSheet.create({
    cameraBody: {
        height: "100%",
        backgroundColor: "red"
    },
    container: {
        height: 200
    }
})

export default MyCamera