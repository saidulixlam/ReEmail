import { createSlice } from "@reduxjs/toolkit";
import { EditorState } from "draft-js";

const emailInitialState = {
    inboxEmails: [],
    sentEmails: [],
    email: '',
    subject: '',
    body: EditorState.createEmpty()
}

export const emailSlice = createSlice({
    name: 'email',
    initialState: emailInitialState,
    reducers: {
        setInboxEmails: (state, action) => {
            state.inboxEmails = action.payload;
        },
        setSentEmails: (state, action) => {
            state.sentEmails = action.payload;
        },
        setEmail: (state, action) => {
            state.email = action.payload
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
        deleteEmail: (state, action) => {
            const emailIdToDelete = action.payload;
            state.inboxEmails = state.inboxEmails.filter(email => email.id !== emailIdToDelete);
            state.sentEmails = state.sentEmails.filter(email => email.id !== emailIdToDelete);
        },
        markEmailAsRead: (state, action) => {
            const emailIdToMarkAsRead = action.payload;
            state.inboxEmails = state.inboxEmails.map(email => {
                if (email.id === emailIdToMarkAsRead) {
                    return { ...email, read: true };
                }
                return email;
            });
        }
    }
});

export const emailActions = emailSlice.actions;
