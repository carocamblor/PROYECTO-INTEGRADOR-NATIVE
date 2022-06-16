import React, {Component} from "react";
import {View, Text, TouchableOpacity, FlatList} from "react-native"
import {db, auth} from "../../firebase/config"
import Post from "../../components/Post"


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

    render() {
        console.log(this.state.userPosts)
        const {styles} = this.props.route.params

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

               
                <View style={styles.prueba}>
                    <FlatList
                        data={this.state.userPosts}
                        keyExtractor={item => item.id.toString()} 
                        renderItem ={({item}) =>
                            <Post navigation={this.props.navigation} postInfo={item} styles={styles}/>
                        }
                    />
                </View>

                <TouchableOpacity onPress={() => this.props.route.params.logout()}>
                    <Text>Sign out</Text>
                </TouchableOpacity>
            </View>
        )
    }
}


export default Profile
