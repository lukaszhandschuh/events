import { combineReducers } from "@reduxjs/toolkit";
import eventReducer from "../features/eventSlice";

const rootReducer = combineReducers({
  events: eventReducer,
});

export default rootReducer;
