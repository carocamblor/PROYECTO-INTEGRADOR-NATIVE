import React, {Component} from "react";
import {View, Text, TouchableOpacity} from "react-native"
import {db, auth} from "../../firebase/config"


class Profile extends Component{
    constructor(props){
        super(props)
        this.state = {
            posts: [],
            loading: true
        }
    }

  

    render(){
        console.log(this.state.posts)
        return(
            <View>
                <Text>Componente Profile</Text>

                <TouchableOpacity onPress={() => this.props.route.params.logout()}>
                    <Text>Sign out</Text>
                </TouchableOpacity>

            </View>
        )
    }
}


export default Profile
