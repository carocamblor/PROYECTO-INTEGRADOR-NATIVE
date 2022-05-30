import React from "react";
import {Text, View, Image} from "react-native"

function Post(props){
    return(
        <View style={props.styles.postCard}>
            <View style={props.styles.userInfo}>
                <Text>Foto de perfil</Text>
                <Text> {props.postInfo.data.useremail} </Text> 
            </View>
            
            <View>
                <Text> {props.postInfo.data.post} </Text>
            </View>

            <View>
                <Text>Parte para dar like</Text>
            </View>

            <View>
                <Text>Parte para los comentarios</Text>
            </View>

        </View>
    )
}

export default Post;