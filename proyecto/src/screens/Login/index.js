import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import { AntDesign } from '@expo/vector-icons'; 

class Login extends Component {

    constructor(props){
        super(props)
        this.state = {
            email: '',
            password: '',
            loading: false,
            emptyFields: true
        }
    }


    componentDidMount(){
        
    }

    render() {
        return (
            <View style={styles.screen}>
            <View style={styles.container}>
                <Text style={styles.title}>Login</Text>
                <TextInput
                    style={styles.input}
                    keyboardType='email-address'
                    placeholder='Email'
                    placeholderTextColor='white'
                    value={this.state.email}
                    onChangeText={ text => this.setState({email: text})}
                />
                <TextInput
                    style={styles.input}
                    keyboardType='default'
                    placeholder='Password'
                    placeholderTextColor='white'
                    value={this.state.password}
                    secureTextEntry={true}
                    onChangeText={ text => this.setState({password: text})}
                />

                { (this.state.email !== '' && this.state.password != '') ?

                <TouchableOpacity style={styles.button} onPress={() => {
                    this.props.login(this.state.email, this.state.password)
                        this.setState({
                            loading: true
                        })
                    
                }}>
                        {this.state.loading && this.props.loginError === '' ?
                            <ActivityIndicator size='small' color='black' />:
                            <Text style={styles.buttonText}>Login</Text>
                        }
                    
                </TouchableOpacity> :

                <TouchableOpacity style={styles.inactiveButton}>
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>

                }

                <View style={this.props.loginError ? styles.errorContainerShow : styles.errorContainerHide}>
                    <AntDesign name="exclamationcircle" size={24} color="white" />
                    <Text style={styles.errorText}>{this.props.loginError}</Text>
                </View>
                <TouchableOpacity style={styles.linkContainer} onPress={() => {
                    this.props.navigation.navigate('Register')
                    this.props.cleanErrors()
                    this.setState({
                        email: '',
                        password: ''
                    })
                    }}>
                    <Text style={styles.text}>
                        ¿Don't have an account?
                    </Text>
                    <Text style={styles.link}>
                        Sign up here.
                    </Text>
                </TouchableOpacity>
            </View>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    screen: {
        backgroundColor: '#202020',
        height: '100%'
    },
    container: {
        padding: 50,
        height: '70%',
        justifyContent: 'space-evenly'
    },
    title: {
        color: 'white',
        fontWeight: 500,
        fontSize: 32
    },
    input: {
        borderWidth: 1,
        padding: 15,
        borderColor: 'white',
        borderStyle: 'solid',
        borderRadius: 6,
        marginVertical: 10,
        color: 'white',
        fontSize: 17
    },
    button: {
        backgroundColor: '#03DAC5',
        padding: 13,
        textAlign: 'center',
        borderRadius: 4,
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: '#03DAC5',
        marginVertical: 10,
    },
    inactiveButton: {
        opacity: 0.5,
        backgroundColor: '#03DAC5',
        padding: 13,
        textAlign: 'center',
        borderRadius: 4,
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: '#03DAC5',
        marginVertical: 10,
    },
    buttonText: {
        fontSize: 17,
        fontWeight: 'bold'
    },
    text: {
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        fontSize: 15
    },
    link: {
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        fontSize: 15,
        textDecorationLine: 'underline'
    },
    linkContainer: {
        display: 'flex',
        flexDirection: 'row',
        gap: 5,
        justifyContent: 'center'
    },
    errorContainerHide:{
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: '#EF476F',
        borderRadius: 4,
        padding: 10,
        gap: 5,
        opacity: 0
    },
    errorContainerShow:{
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: '#EF476F',
        borderRadius: 4,
        padding: 10,
        gap: 5,
    },
    errorText: {
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        fontSize: 15,
    }
  });

export default Login;