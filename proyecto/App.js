import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import StackNavigation from './src/navigation/StackNavigation';

export default function App() {
  return (
    <View style={styles.app}>
      <StackNavigation styles={styles}/>
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

  //Home Screen styles
  screen: {
    backgroundColor: '#202020',
    height: '100%'
  },

  text: {
    color: 'white',
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