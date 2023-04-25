import { FlatList, View, StyleSheet, TextInput, Button } from "react-native";
import { TodoItem } from "./todoItem";
import { useGetTodos, usePostTodo } from "./todos-hooks";
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from "react";
import { TodoEntity } from "./todoEntity";


export const Todos = () => {
    const [text, setText] = useState('');
    const { isLoading, error, data } = useGetTodos();
    const queryClient = useQueryClient()
    const { mutate: createTodo } = usePostTodo()
    
    const handleAddTodo = () => {
        const todoEntity: TodoEntity = new TodoEntity(text, false)
        createTodo(todoEntity, { 
            onSuccess: () => queryClient.invalidateQueries({ queryKey: ['todos'] }) 
        })
    }

    console.log(data);
    return (
        <View>
            <View>
                <TextInput
                    style={styles.input}
                    onChangeText={setText}
                    value={text}
                />
                <Button title="Add todo" onPress={handleAddTodo} />
            </View>
            <View>
                <FlatList
                    data={data}
                    renderItem={({item}) => <TodoItem done={item.done} text={item.text} />}
                    keyExtractor={item => item.id.toString()}
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
  });

  