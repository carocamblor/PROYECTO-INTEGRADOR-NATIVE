import React from "react";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";

import Home from "../screens/Home";
import Profile from "../screens/Profile"
import CreatePost from "../screens/CreatePost";

// -- Importamos los iconos -- //
import { AntDesign } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

function TabNavigation(props){
    const {styles} = props.route.params
    return(
        <Tab.Navigator screenOptions={{ tabBarShowLabel: false, headerShown: false}}> 
            <Tab.Screen
                name="CreatePost"
                component={CreatePost}
                initialParams={{styles: styles}}
                options={
                    {tabBarIcon: () => <Feather style={styles.postIcon} name="plus-square" size={24} color="black" />}
                }
            />
            
            <Tab.Screen
                name="Home"
                component={Home}
                initialParams={{logout: () => props.route.params.logout(), styles: styles}}
                options={
                    {tabBarIcon: () => <AntDesign name="home" size={24} color="black" />}
                }
            />

            <Tab.Screen
                name="Profile"
                component={Profile}
                options={
                    {tabBarIcon: () => <AntDesign name="user" size={24} color="black" />}
                }
            />
            
        </Tab.Navigator>
    )

}


export default TabNavigation;