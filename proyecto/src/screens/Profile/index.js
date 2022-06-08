import React, {Component} from "react";
import {View, Text, TouchableOpacity} from "react-native"

class Profile extends Component{
    constructor(props){
        super(props)
        this.state = {

        }
    }
    render(){
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
