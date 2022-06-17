import React, {Component} from "react";
import {View, Text, TouchableOpacity, FlatList, Image, StyleSheet} from "react-native"
import {db, auth} from "../../firebase/config"
import Post from "../../components/Post"
import { Feather } from '@expo/vector-icons';

class Profile extends Component{
    constructor(props){
        super(props)
        this.state = {
            userPosts: [],
            loading: true,
            userInfo: {},
            display: "grid"

        }
    }

  

    componentDidMount(){
        db.collection("posts").where("useremail", "==", auth.currentUser.email).onSnapshot( //todo lo que trae onSnapshot lo trae en forma de array
            docs => {
                let posts = [];
                docs.forEach( doc => {
                    posts.push({
                        id: doc.id,                 //El id lo crea Firebase al crear cada uno de los documentos en nuestra coleccion
                        data: doc.data()
                    })
                })
                this.setState({
                    userPosts: posts,
                    loading: false
                })
            })
        db.collection("users").where("owner", "==", auth.currentUser.email).onSnapshot(
            docs =>{
             
                docs.forEach( doc => {
                 
                    this.setState({
                        userInfo: doc.data()
                    })
                }

                )
            }
        )
    }

    changeDisplay(){
        if (this.state.display === 'grid') {
            this.setState({
                display: 'column'
            })
        } else {
            this.setState({
                display: 'grid'
            })
        }
    }

    render() {
        console.log(this.state.userPosts)
        console.log(this.state.posts)
        return (
            <View style={styles.screen}>

            <View>
                <Text>
                    @{this.state.userInfo.username}
                </Text>
                <Text>
                    {auth.currentUser.metadata.lastSignInTime}
                    {auth.currentUser.metadata.creationTime}
                </Text>
            </View>

            <TouchableOpacity onPress={() => this.changeDisplay()}>
                {this.state.display === 'grid' ?
                        <Feather name="menu" size={24} color="white" /> :
                        <Feather name="grid" size={24} color="white" />
                }
            </TouchableOpacity>

               
                <View style={styles.prueba}>
                    { this.state.display === 'grid' ?
                    <FlatList
                        data={this.state.userPosts}
                        key={'g'}
                        numColumns={3}
                        keyExtractor={item => item.id.toString()} 
                        renderItem ={({item}) =>
                            <Image
                                source={{uri: item.data.photo}}
                                resizeMode="cover"
                                style={styles.image}
                            />                             
                        }
                    /> :
                    <FlatList
                        data={this.state.userPosts}
                        key={'c'}
                        keyExtractor={item => item.id.toString()} 
                        renderItem ={({item}) =>
                            <Post navigation={this.props.navigation} postInfo={item} styles={styles}/>
                        }
                    />
                    }
                </View>

                <TouchableOpacity onPress={() => this.props.route.params.logout()}>
                    <Text>Sign out</Text>
                </TouchableOpacity>
            </View>
        )
    }
}


export default Profile;

const styles = StyleSheet.create({
    image: {
        width: 135,
        height: 135,
    },
    screen: {
        backgroundColor: '#202020',
        height: '100%'
      },
})