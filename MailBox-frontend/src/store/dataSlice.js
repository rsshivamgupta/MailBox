import { createSlice } from "@reduxjs/toolkit";

let initialState = {
  readEmailData: null,
  selectedTab: "inbox",
  inboxMail: [],
  inboxUnreadMail: 0,
  sentMail: [],
};

const dataSlice = createSlice({
  name: "data",
  initialState: initialState,
  reducers: {
    setReadEmailData(state, data) {
      state.readEmailData = data.payload;
    },
    setSelectedTab(state, data) {
      state.selectedTab = data.payload;
    },
    setInboxMail(state, data) {
      state.inboxMail = data.payload;
    },
    setSentMail(state, data) {
      state.sentMail = data.payload;
    },
    setNoOfUnreadMail(state, data) {
      state.inboxUnreadMail = data.payload;
    },
  },
});

export default dataSlice;
