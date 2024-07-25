import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { TEvent } from "../../models/event";

type TEventState = {
  status: "idle" | "pending" | "rejected";
  data: TEvent[];
  selectedEvent: TEvent | null;
};

const initialState: TEventState = {
  status: "idle",
  data: [],
  selectedEvent: null,
};

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const addEvent = createAsyncThunk<TEvent, TEvent, any>(
  "events/add",
  async (event) => {
    // const response = await fetch('/src/assets/events/add', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(event),
    // });
    // const data = await response.json();
    // return data;
    await sleep(1000);
    event.id = Math.floor(Math.random() * 1000000) + 10;
    return event;
  }
);

export const getEvents = createAsyncThunk<TEvent[], void, any>(
  "events/getAll",
  async () => {
    await sleep(1000);
    const response = await fetch("/src/assets/events.json");
    const data = await response.json();
    return data;
  }
);

export const getEvent = createAsyncThunk<number, number, any>(
  "events/getEventById",
  async (id) => {
    // const response = await fetch(`/src/assets/events/${id}`);
    // const data = await response.json();
    // return data;
    await sleep(1000);
    return id;
  }
);

const eventSlice = createSlice({
  name: "event",
  initialState,
  reducers: {
    clearSelectedEvent(state) {
      state.selectedEvent = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getEvents.pending, (state) => {
        state.status = "pending";
      })
      .addCase(addEvent.pending, (state) => {
        state.status = "pending";
      })
      .addCase(getEvent.pending, (state) => {
        state.status = "pending";
      })
      .addCase(getEvents.fulfilled, (state, action) => {
        state.status = "idle";
        state.data = action.payload;
      })
      .addCase(addEvent.fulfilled, (state, action) => {
        state.status = "idle";
        state.data.push(action.payload);
      })
      .addCase(getEvent.fulfilled, (state, action) => {
        state.status = "idle";
        const event = state.data.find((ev) => ev.id === action.payload);
        state.selectedEvent = event ? event : null;
      });
  },
});

export const { clearSelectedEvent } = eventSlice.actions;

export default eventSlice.reducer;
