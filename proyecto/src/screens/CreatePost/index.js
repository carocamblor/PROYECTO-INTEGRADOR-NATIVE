import React, {Component} from "react";

import {View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet} from "react-native";

import MyCamera from "../../components/MyCamera";

import { auth, db } from "../../firebase/config";


class CreatePost extends Component{
    constructor(props){
        super(props)
        this.state = {
            postDescription: "",
            post: "",
            tagUsers: [],
            show: false
        }
        this.cameraMethods = undefined;
    }
    
    componentDidMount(){
        console.log(this.props)
        //Traer los usuarios para etiquetar
        db.collection("users").onSnapshot(
            docs => {
                let users = []
                docs.forEach(doc =>  {
                    users.push({
                        id: doc.id,
                        data: doc.data()
                    })
                })
            this.setState({
                tagUsers: users
            })    
        })
    }

    tagUsers(){
        this.state.show ?
        this.setState({
            show: false
        }) :
        this.setState({
            show: true
        })
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
        console.log(this.state.tagUsers)
        console.log(this.state.show)
        return(
            <View style={styles.postScreen}>
                
                <View style={styles.titleContainer}>
                    <Text style={styles.postTitle}>Add a Post</Text>
                </View>

                <View style={styles.cameraContainer}>
                    <MyCamera />
                </View>
                {/* Me llevo el contenido de debajo a MyCamera */}
                {/* <View style={styles.formContainer}>
                    <TextInput
                        style={styles.postInput}
                        keyboardType="email-address"
                        placeholder=""
                        onChangeText={text =>
                        this.setState({
                            postDescription: text
                        })}
                    />

                    <TouchableOpacity style={styles.postButton} onPress={() => this.onSubmit()}>
                        <Text style={styles.buttonText}>Post Picture</Text>
                    </TouchableOpacity>
                </View> */}

                
                {/*

                    <TouchableOpacity style={styles.tagButton} onPress={()=> this.tagUsers()}>
                        <Text>Tag users</Text>
                    </TouchableOpacity>
                     
                    <View>
                        <FlatList
                            style={this.state.show ? styles.show : styles.hide} //Tenemos que hacer aun los estilos!
                            data={this.state.tagUsers}
                            keyExtractor={item => item.id.toString()}
                            renderItem ={({item}) =>
                                <Text>{item.data.username}</Text>
                            }
                        />
                    </View>

                   */}
                
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
        height: 200,
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

    //   postForm:{
    //     display: "flex",
    //     justifyContent: "space-evenly",
    //     alignItems: "center",
    //     flex: 1,
    //     width: "auto",
    //     paddingRight: 50,
    //     paddingLeft: 50
    //   },
    
    //   postInput: {
    //     borderWidth: 1,
    //     padding: 15,
    //     borderColor: 'white',
    //     borderStyle: 'solid',
    //     borderRadius: 6,
    //     marginVertical: 10,
    //     color: 'white',
    //     fontSize: 17,
    //     width: "100%"
    //   },
    
    
    //   tagButton: {
    //     backgroundColor: '#03DAC5',
    //     padding: 13,
    //     textAlign: 'center',
    //     borderRadius: 4,
    //     borderWidth: 1,
    //     borderStyle: 'solid',
    //     borderColor: '#03DAC5',
    //     marginVertical: 10,
    //     width: "30%"
    //   },
    
    //   postTitle: {
    //     color: 'white',
    //     fontWeight: 500,
    //     fontSize: 32,
    //     textAlign: "left",
    //     width: "100%"
    //   },
    
    //   buttonText: {
    //     fontSize: 17,
    //     fontWeight: 'bold'
    //   },
    
    //   show:{
    //     display: "flex",
    //     backgroundColor: "red"
    //   },
    
    //   hide: {
    //     display: "none"
    //   },
    
    //   camera:{
    //     height: 300
    //   },
    
})