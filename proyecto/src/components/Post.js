import React, {Component} from "react";
import {Text, View, Image, TouchableOpacity} from "react-native"

import { MaterialCommunityIcons } from '@expo/vector-icons';


class Post extends Component{
    constructor(props){
        super(props)
        this.state = {

        }
    }

    render(){
        return(
            <View style={this.props.styles.postCard}>
                <View style={this.props.styles.userInfo}>
                    <Text>Foto de perfil</Text>
                    <Text> {this.props.postInfo.data.useremail} </Text> 
                </View>
                
                <View>
                    <Text> {this.props.postInfo.data.post} </Text>
                </View>

                <View>
                    <Text>Parte para dar like</Text>
                </View>

                <View>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate("Comments", {id: this.props.postInfo.id})}>
                        <MaterialCommunityIcons name="comment-outline" size={24} color="black" />
                    </TouchableOpacity>
                </View>

            </View>
        )
    }
}

export default Post;