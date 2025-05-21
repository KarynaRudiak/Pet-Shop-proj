import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isOpen: false,
    title: "",
    content: [],
};

export const modalSlice = createSlice({
    name: "modal",
    initialState,
    reducers: {
        openModal: (state, action) => {
            state.isOpen = true;
            state.title = action.payload.title || "";
            state.content = action.payload.content || [];
        },
        closeModal: (state) => {
            state.isOpen = false;
            state.title = "";
            state.content = [];
        },
    },
});

export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;
