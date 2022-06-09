import React, { Component } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// -- Importamos las vistas que se incluyen en el StackNavigation -- //
import TabNavigation from "./TabNavigation";
import Login from "../screens/Login/index";
import Register from "../screens/Register/index";
import Comments from "../screens/Comments";

// -- Importamos modulos para trabajar con Firebase -- //
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
                
                .then(response => 
                    this.setState({
                        loggedIn: true
                    })) // esto va acá o en el then anterior?
                
                .catch(e => 
                    this.setState({
                        registerError: 'Error creating user.'
                    })) // esto está bien?
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
            // falta un catch? --> Creo que deberiamos poner algo asi como: "No se pudo cerrar sesion. Codigo de error: (buscar si tiene un codigo el error que recibimos)"
    }
    
    cleanErrors(){
        this.setState({
            loginError: "",
            registerError: ""
        })
    }
    

    render(){
        return(
            <NavigationContainer>
                <Stack.Navigator>
                    {this.state.loggedIn ?
                    <Stack.Group>
                        <Stack.Screen
                            name='TabNavigation'
                            component={ TabNavigation }
                            initialParams={ {logout: () => this.logout(), styles: this.props.styles} }
                            options={{
                                headerStyle: {
                                    backgroundColor: '#202020',
                                    borderBottomColor: '#404040'
                                },
                                headerTintColor: '#fff',
                                headerTitleStyle: {
                                    fontWeight: 'bold',
                                },
                                headerTitleAlign: 'center',
                                title: 'Nombre de nuestra app',
                            }}
                        />
                        <Stack.Screen
                            name="Comments"
                            component={Comments}
                            initialParams={{}}
                            options={{
                                headerStyle: {
                                    backgroundColor: '#202020',
                                    borderBottomColor: '#404040'
                                },
                                headerTintColor: '#fff',
                                headerTitleStyle: {
                                    fontWeight: 'bold',
                                },
                                headerTitleAlign: 'center',
                                title: 'Comments',
                            }}
                        />
                    </Stack.Group> :
                    <Stack.Group screenOptions={{headerShown: false}}>
                        <Stack.Screen
                        name='Login'
                        children={(props) => <Login cleanErrors={() => this.cleanErrors()} login={(email, pass) => this.login(email, pass)} loginError={this.state.loginError} {...props} />}
                        />
                        <Stack.Screen
                            name='Register'
                            children={(props) => <Register cleanErrors={() => this.cleanErrors()} register={(email, username, pass) => this.register(email, username, pass)} registerError={this.state.registerError} {...props} />}
                        />
                    </Stack.Group>
                    }
                </Stack.Navigator>
            </NavigationContainer>
        )
    }

}

export default StackNavigation;