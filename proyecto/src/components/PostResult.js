import React from "react";

function PostResults(){
    <View>
        <View style={styles.userInfo}>
            <FontAwesome name="user-circle" size={24} color="white" />
            <Text style={styles.username}> {this.state.userInfo.username} </Text> 
            {postAuthor == auth.currentUser.email ?
            <TouchableOpacity onPress={() => this.deletePost()}>
                <Feather name="trash-2" size={20} color="white" />
            </TouchableOpacity> :
            <></>
            }
        </View>
        <View style={styles.imageContainer}>
            <Image
                source={{uri: this.props.postInfo.data.photo}}
                resizeMode="cover"
                style={styles.image}
            />
        </View>
    </View>

}



export default PostResults