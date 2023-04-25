import axios from "axios"
import { useQuery, useMutation } from 'react-query'
import { TodoEntity } from "../todoEntity"

const baseUrl = 'http://localhost:3003'

export const useGetTodos = () => {
    const fetchTodoList = async () => {
        return await axios.get(baseUrl + '/todos')
    }

    const { isLoading, isError, data, error } = useQuery('todos', fetchTodoList)
    return { isLoading, isError, data: data?.data, error };
}


export const usePostTodo = () => {
    return useMutation((newTodo: TodoEntity) => {
        return axios.post(baseUrl + '/todos', newTodo)
    })
}