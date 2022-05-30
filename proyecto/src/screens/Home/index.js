import React, { Component } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, FlatList, TouchableOpacity} from 'react-native';

import Post from '../../components/Post';
import { db } from '../../firebase/config';
//Sustituimos el pedido a Firebase por el momento con un array de posteos
class Home extends Component {

    constructor(props){
        super(props)
        this.state = {
            posts: [],
            loading: true
        }
    }

    componentDidMount(){
        db.collection("posts").onSnapshot(
            docs => {
                let posts = [];
                docs.forEach( doc => {
                    posts.push({
                        id: doc.id,                 //El id lo crea Firebase al crear cada uno de los documentos en nuestra coleccion
                        data: doc.data()
                    })
                })
                this.setState({
                    posts: posts,
                    loading: false
                })
            })
    }

    render() {
        const {styles} = this.props.route.params

        console.log(this.state.posts)
        return (
            <View style={styles.screen}>
                <View>
                    <Text style={styles.containerHeader}>Welcome back! Let's check what has been going on</Text>
                    <FlatList
                        data={this.state.posts}
                        keyExtractor={item => item.id.toString()}
                        renderItem ={({item}) =>
                            <Post navigation={this.props.navigation} postInfo={item} styles={styles}/>
                        }
                    />
                </View>
                <TouchableOpacity onPress={() => this.props.route.params.logout()}>
                    <Text style={styles.text}>Sign out</Text>
                </TouchableOpacity>
            </View>
        )
    }

}

export default Home;