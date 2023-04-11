import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux';
import { Counter } from './features/counter/counter';
import { Problems } from './features/problems/problems';
import { Login } from './features/users/login';
import { Signup } from './features/users/signup';
import { store } from './store'

export default function App() {
  return (
    <Provider store={store}>
      <View style={styles.container}>
        {/* <Login></Login>
        <Signup></Signup>
        <Counter></Counter> */}
        <Problems></Problems>
        <StatusBar style="auto" />
      </View>
    </Provider>
    
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});
