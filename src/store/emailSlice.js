import { createSlice } from "@reduxjs/toolkit";
import { EditorState } from "draft-js";

const emailInitialState = {
    emails:[],
    email:'',
    subject: '',
    body: EditorState.createEmpty(),
}
export const emailSlice = createSlice({
    name: 'email',
    initialState: emailInitialState,
    reducers: {
        setEmails: (state,action) =>{
            state.emails = action.payload;
        },
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