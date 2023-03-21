import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { UsersAPI } from './usersAPI'
import { UsersEntity } from './usersEntity'

// First, create the thunk
export const login = createAsyncThunk(
  'auth/login', // This is a name for the thunk (must be unique) not the endpoint
  async (user: UsersEntity, thunkAPI) => {
    const response = UsersAPI.login(user)
    
    return response
  }
)
export const signup = createAsyncThunk(
    'auth/signup', // This is a name for the thunk (must be unique) not the endpoint
    async (user: UsersEntity, thunkAPI) => {
      const response = UsersAPI.signup(user);
      
      return response
    }
  )

interface UsersState {
  token: string | undefined
  error: string | undefined
}

const initialState = {
  token: undefined,
  error: undefined
} as UsersState

// Then, handle actions in your reducers:
const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    // standard reducer logic, with auto-generated action types per reducer
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(signup.fulfilled, (state, action) => {
      console.log("running signup fulfilled");
      state.error = undefined;
      if (action.payload.id != undefined) {
        state.error = "Signup success";
      }
  })
    builder.addCase(login.fulfilled, (state, action) => {
        console.log("running login fulfilled");
        state.error = undefined;
        state.token = action.payload?.access_token
    })
    builder.addCase(login.rejected, (state, action) => {
        if (action.error.message === 'Request failed with status code 401') {
            state.error = 'Invalid login'
            state.token = undefined
        }
        
        console.log("error in slice", action.error);
    })
  },
})

// Action creators are generated for each case reducer function

export default usersSlice.reducer

// Later, dispatch the thunk as needed in the app
// dispatch(fetchUserById(123))