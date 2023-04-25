import React, { useEffect, useState } from 'react'
import { View, Text, TextInput, StyleSheet, Button, Image, SafeAreaView, FlatList, StatusBar } from 'react-native'
import { useGetTodos, usePostTodo } from './hooks/todos-hooks';
import { useQueryClient } from '@tanstack/react-query'
import { TodoEntity } from './todoEntity';
import { queryClient } from '../../App';


const Item = (props: any) => (
  <View >
    <Text>{props.text}</Text>
    <Text>{props.done.toString()}</Text>
  </View>
);

export function Todos() {
    const { isLoading, error, data } = useGetTodos();
    const [todo, setTodo] = useState('');
    const { mutate: createTodo } = usePostTodo()

    console.log("data is now", data);

    const handleAddTodo = () => {
        const todoEntity: TodoEntity = new TodoEntity(todo, false)
        createTodo(todoEntity, { onSuccess: () => queryClient.invalidateQueries({ queryKey: ['todos'] }) })
    };

    if (isLoading) return <Text>'Loading...'</Text>

    if (error) return <Text>'An error has occurred: ' + error</Text>

    return (
        <View>
            <View>
                <TextInput
                    style={styles.input}
                    onChangeText={setTodo}
                    value={todo}
                />
                <Button onPress={handleAddTodo} title="Create todo"/>
            </View>
        
            <View>
                <FlatList
                    data={data}
                    renderItem={({item}) => <Item text={item.text} done={item.done} />}
                    keyExtractor={item => item.id}
                />
            </View>
        </View>
  );
}

const styles = StyleSheet.create({
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
      },
      container: {
        flex: 1,
        marginTop: StatusBar.currentHeight || 0,
      },
});