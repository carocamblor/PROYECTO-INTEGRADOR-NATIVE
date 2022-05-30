import React from "react";
import {View, Text, FlatList} from "react-native";

import Post from "./Post";

function PostContainer(props){
    return(
        <View>
            <Text style={props.styles.containerHeader}>Welcome back! Let's check what has been going on</Text>
            <FlatList
                data={props.posts}
                keyExtractor={item => item.id.toString()}
                renderItem ={({item}) =>
                    <Post postInfo={item} styles={props.styles}/>
                }
            />
        </View>
    )
}

export default PostContainer;