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
        resetEmailComposition: (state) => {
            state.subject = '';
            state.body = EditorState.createEmpty();
        },
        addEmailToInbox: (state, action) => {
            state.emails.push(action.payload);
          },
        deleteEmail: (state, action) => {
            // Implement the logic to delete the email from the emails array
            const emailIdToDelete = action.payload;
            state.emails = state.emails.filter(email => email.id !== emailIdToDelete);
        }, 
        markEmailAsRead: (state, action) => {
            const emailIdToMarkAsRead = action.payload;
            state.emails = state.emails.map(email => {
              if (email.id === emailIdToMarkAsRead) {
                // Update the email's read property to true
                return { ...email, read: true };
              }
              return email;
            });
        }
    }

})

export const emailActions = emailSlice.actions