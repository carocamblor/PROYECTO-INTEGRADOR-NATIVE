import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import StackNavigation from './src/navigation/StackNavigation';

export default function App() {
  return (
    <View style={styles.app}>
      <StackNavigation/>
    </View>
  );
}

const styles = StyleSheet.create({
  app: {
    height: '100%'
  },
});