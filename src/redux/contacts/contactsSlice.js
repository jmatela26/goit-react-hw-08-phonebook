import { createSlice } from "@reduxjs/toolkit";
import { getAllContacts, createContact, deleteContact } from "./operations";

const contactsInitialState = {
  items: [],
  isLoading: false,
  error: null,
};

const handleSuccess = (state) => {
  state.isLoading = false;
  state.error = null;
};

const handleError = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

const handlePending = (state) => {
  state.isLoading = true;
};

const contactsSlice = createSlice({
  name: "contacts",
  initialState: contactsInitialState,
  extraReducers: {
    [getAllContacts.pending](state) {
      handlePending(state);
    },
    [getAllContacts.fulfilled](state, action) {
      handleSuccess(state);
      state.items = action.payload;
    },
    [getAllContacts.rejected](state, action) {
      handleError(state, action);
    },
    [createContact.pending](state) {
      handlePending(state);
    },
    [createContact.fulfilled](state, action) {
      handleSuccess(state);
      state.items.push(action.payload);
    },
    [createContact.rejected](state, action) {
      handleError(state, action);
    },
    [deleteContact.pending](state) {
      handlePending(state);
    },
    [deleteContact.fulfilled](state, action) {
      handleSuccess(state);
      const index = state.items.findIndex(
        (contact) => contact.id === action.payload.id
      );
      state.items.splice(index, 1);
    },
    [deleteContact.rejected](state, action) {
      handleError(state, action);
    },
  },
});

export const contactsReducer = contactsSlice.reducer;
