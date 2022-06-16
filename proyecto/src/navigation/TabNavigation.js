import React from "react";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";

import Home from "../screens/Home";
import Profile from "../screens/Profile"
import CreatePost from "../screens/CreatePost";
import Search from "../screens/Search";

// -- Importamos los iconos -- //
import { AntDesign } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

function TabNavigation(props){
    const {styles} = props.route.params
    return(
        <Tab.Navigator screenOptions={{
            tabBarShowLabel: false,
            headerShown: false,
            tabBarStyle: {
                backgroundColor: '#202020',
                borderTopColor: '#404040'
            }
            }}> 
            
            <Tab.Screen
                name="Home"
                component={Home}
                initialParams={{styles: styles}}
                options={
                    {tabBarIcon: () => <AntDesign name="home" size={24} color="white" />}
                }
            />

            <Tab.Screen
                name="CreatePost"
                component={CreatePost}
                options={
                    {tabBarIcon: () => <Feather style={styles.postIcon} name="plus-square" size={24} color="black" />}
                }
            />

            <Tab.Screen
                name="Profile"
                component={Profile}
                initialParams={{logout: () => props.route.params.logout(), styles: styles}}
                options={
                    {tabBarIcon: () => <AntDesign name="user" size={24} color="white" />}
                }
            />
            
            <Tab.Screen
                name="Search"
                component={Search}
                initialParams={{}}
                options={
                    {tabBarIcon: () => <AntDesign name="search1" size={24} color="white" />}
                }
             />
            

            
        </Tab.Navigator>
    )

}


export default TabNavigation;