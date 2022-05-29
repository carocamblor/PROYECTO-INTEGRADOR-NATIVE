import React, { Component } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, FlatList} from 'react-native';

class Home extends Component {

    constructor(props){
        super(props)
        this.state = {
            
        }
    }

    componentDidMount(){

    }

    render() {
        return (
            <View style={styles.screen}>
               <Text style={styles.text}>{'Hola :)'}</Text>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    screen: {
        backgroundColor: '#202020',
        height: '100%'
    },
    text: {
        color: 'white',
    }
  });

export default Home;