import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux';
import { Counter } from './features/counter/counter';
import { Problems } from './features/problems/problems';
import { store } from './store'

export default function App() {
  return (
    <Provider store={store}>
      <View style={styles.container}>
        <Counter></Counter>
        <Problems></Problems>
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
