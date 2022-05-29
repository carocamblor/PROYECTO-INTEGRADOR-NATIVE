import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Register from './src/screens/Register/index'

export default function App() {
  return (
    <View style={styles.app}>
      <Register/>
    </View>
  );
}

const styles = StyleSheet.create({
  app: {
    height: '100%'
  },
});