import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { Component } from "react";
import Login from "../screens/Login/index";
import Register from "../screens/Register/index";
import Home from "../screens/Home/index";
import { auth, db } from "../firebase/config";

const Stack = createNativeStackNavigator();

class StackNavigation extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            loggedIn: false,
            loginError: '',
            registerError: ''
        }
    }

    componentDidMount(){
        auth.onAuthStateChanged( user => {
            if(user){
                this.setState({loggedIn: true})
            }
         })
    }

    register(email, username, pass){
        // falta hacer algún chequeo de que la función recibe los tres parámetros 
        // console.log(email + ' ' + username + ' ' + pass)
        this.setState({registerError: ''})
        auth.createUserWithEmailAndPassword(email, pass)
            .then((response) => {
                db.collection('users').add({
                    username: username,
                    owner: email,
                    createdAt: Date.now()
                })
                .then(response => this.setState({loggedIn: true})) // esto va acá o en el then anterior?
                .catch(e => this.setState({registerError: 'Error creating user.'})) // esto está bien?
            })
            .catch(e => {
                let message = e.message
                this.setState({registerError: message})
            })
    }

    login(email, pass){
        this.setState({loginError: ''})
        auth.signInWithEmailAndPassword(email, pass)
            .then(response => {
                this.setState({loggedIn: true})
            })
            .catch(e => {
                let message = e.message
                this.setState({loginError: message})
            })
    }

    logout(){
        auth.signOut()
            .then(response => this.setState({loggedIn: false}))
            // falta un catch?
    }

    render(){
        return(
            <NavigationContainer>
                <Stack.Navigator
                    screenOptions={{
                        headerShown: false
                    }}
                >
                    {this.state.loggedIn ?
                    <Stack.Group>
                        <Stack.Screen
                            name='Home'
                            component={ Home }
                            // name='TabNavigation'
                            // component={ TabNavigation }
                            initialParams={ {logout: () => this.logout()} }
                            />
                    </Stack.Group> :
                    <Stack.Group>
                        <Stack.Screen
                        name='Login'
                        children={(props) => <Login login={(email, pass) => this.login(email, pass)} loginError={this.state.loginError} {...props} />}
                        />
                        <Stack.Screen
                            name='Register'
                            children={(props) => <Register register={(email, username, pass) => this.register(email, username, pass)} registerError={this.state.registerError} {...props} />}
                        />
                    </Stack.Group>
                    }
                </Stack.Navigator>
            </NavigationContainer>
        )
    }

}

export default StackNavigation;