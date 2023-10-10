import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isSidebarCollapsed: false,
  showModal: false,       // Initial state for modal visibility
  activeFolder: 'inbox',  // Initial active folder
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.isSidebarCollapsed = !state.isSidebarCollapsed;
    },
    setShowModal: (state, action) => {
      state.showModal = action.payload;
    },
    setActiveFolder: (state, action) => {
      state.activeFolder = action.payload;
    },
  },
});

export const { toggleSidebar, setShowModal, setActiveFolder } = uiSlice.actions;

export default uiSlice;
