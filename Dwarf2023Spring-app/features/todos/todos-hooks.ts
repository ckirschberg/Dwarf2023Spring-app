import axios from "axios"
import {
  useQuery,
  useMutation
} from '@tanstack/react-query'
import { TodoEntity } from "./todoEntity"

const baseUrl = 'http://localhost:3003'

export const useGetTodos = () => {
    const fetchTodos = async () => {
        return await axios.get(baseUrl + '/todos');
    }

    const { isLoading, isError, data, error } = useQuery(
        { queryKey: ['todos'], queryFn: fetchTodos }
    );
    return {isLoading, isError, data: data?.data, error}
}

export const usePostTodo = () => {
    return useMutation({
        mutationFn: (newTodo: TodoEntity) => {
          return axios.post(baseUrl + '/todos', newTodo)
        },
      })
}