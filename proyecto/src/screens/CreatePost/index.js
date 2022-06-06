import React, {Component} from "react";
import {View, Text, TextInput, TouchableOpacity, FlatList} from "react-native";
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
    }
    
    componentDidMount(){
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
        const {styles} = this.props.route.params
        console.log(this.state.tagUsers)
        console.log(this.state.show)
        // console.log(auth.currentUser.displayName) // Necesitamos antes haber creado usuarios con nombre de usuario tambien!!!!
        return(
            <View style={styles.postScreen}>
                                
                <View style={styles.postForm}>
                    <Text style={styles.postTitle}>Add a post</Text>
                
                    <TextInput
                        style={styles.postInput}
                        keyboardType="email-address"
                        placeholder="Tell us something more!"
                        onChangeText={ text => 
                            this.setState({
                                postDescription: text
                            })
                        }
                    />

                    <TextInput
                        style={styles.postInput}
                        keyboardType="email-address"
                        placeholder="Insert your picture"
                        onChangeText={ text => 
                            this.setState({
                                post: text
                            })
                        }
                    />

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

                    <TouchableOpacity style={styles.postButton} onPress={() => this.onSubmit()}>
                        <Text style={styles.buttonText}>Post Picture</Text>
                    </TouchableOpacity>
                </View>
                
            </View>
        )
    }
}

export default CreatePost;