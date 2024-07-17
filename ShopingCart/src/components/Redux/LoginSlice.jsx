import { createSlice } from "@reduxjs/toolkit";


const initialState={
    logedIn:0,
    items:0
}

const LoginSlice=createSlice({
    name:"login",
    initialState,
    reducers:{
        handleLogin(state,actions){
            state.logedIn=actions.payload
           
        },
        setItems(state,actions)
        {
            state.items=actions.payload
        }

    }
})
export const {handleLogin,setItems}=LoginSlice.actions
export default LoginSlice.reducer