import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import StackNavigation from './src/navigation/StackNavigation';

export default function App() {
  return (
    <View style={styles.app}>
      <StackNavigation styles={styles}/>
      {/* <Prueba/> */}
    </View>
  );
}

const styles = StyleSheet.create({
  app: {
    height: '100%'
  },

  //Tab Navigation Styles
  postIcon: {
    fontSize: 40,
    backgroundColor: "yellow",
    padding: 10,
    borderRadius: "50%",
    marginTop: -50
  },

  //Home Screen Styles
  screen: {
    backgroundColor: '#202020',
    height: '100%'
  },

  text: {
    color: 'white',
  },

  prueba: {
    flex: 1
  },

  //CreatePost Screen Styles
  postScreen:{
    backgroundColor: '#202020',
    flex: 1,
    width: "100%"
  },

  postForm:{
    height: "40%",
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
    width: "auto",
    padding: 50
  },

  postInput: {
    borderWidth: 1,
    padding: 15,
    borderColor: 'white',
    borderStyle: 'solid',
    borderRadius: 6,
    marginVertical: 10,
    color: 'white',
    fontSize: 17,
    width: "100%"
  },

  postButton: {
    backgroundColor: '#03DAC5',
    padding: 13,
    textAlign: 'center',
    borderRadius: 4,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#03DAC5',
    marginVertical: 10,
    width: "100%"
  },

  tagButton: {
    backgroundColor: '#03DAC5',
    padding: 13,
    textAlign: 'center',
    borderRadius: 4,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#03DAC5',
    marginVertical: 10,
    width: "30%"
  },

  postTitle: {
    color: 'white',
    fontWeight: 500,
    fontSize: 32,
    textAlign: "left",
    width: "100%"
  },

  buttonText: {
    fontSize: 17,
    fontWeight: 'bold'
  },

  show:{
    display: "flex",
    backgroundColor: "red"
  },

  hide: {
    display: "none"
  },

  //PostContainer Component styles
  containerHeader: {
    color: "white"
  },  

  //Post Component styles
  postCard:{
    display: "flex",
    flexDirection: "column",
    backgroundColor: "red",
    alignItems: "center"
  },

  userInfo:{
    display: "flex",
    flexDirection: "row",
    justifyContent: "left",
    padding: 5,
    backgroundColor: "green",
    width: "100%"
  }
});