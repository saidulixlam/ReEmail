import { createSlice } from "@reduxjs/toolkit";
import { EditorState } from "draft-js";

const emailInitialState = {
    email:'',
    subject: '',
    body: EditorState.createEmpty(),
}
export const emailSlice = createSlice({
    name: 'email',
    initialState: emailInitialState,
    reducers: {
        setEmail: (state,action)=>{
            state.email=action.payload
        },
        setEmailSubject: (state, action) => {
            state.subject = action.payload;
        },
        setEmailBody: (state, action) => {
            state.body = action.payload;
        },
        resetEmailComposition: (state,action) => {
            state.subject = '';
            state.body = EditorState.createEmpty();
        }
    }

})

export const emailActions = emailSlice.actions