import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux';
import { Counter } from './features/counter/counter';
import { Problems } from './features/problems/problems';
import { Login } from './features/users/login';
import { Signup } from './features/users/signup';
import { store } from './store'
import { QueryClient, QueryClientProvider } from 'react-query'
import { Todos } from './features/todos/todos';

export const queryClient = new QueryClient();

export default function App() {
  return (
    
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <View style={styles.container}>
            <Login></Login>
            {/*<Signup></Signup>
            <Counter></Counter> */}
            {/* <Problems></Problems> */}
            <Todos></Todos>
          </View>
        </QueryClientProvider>
      </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    flex: 1,
    backgroundColor: '#fff',
  },
});
