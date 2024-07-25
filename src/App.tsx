import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import styled from "styled-components";
import "./App.css";
import Header from "./components/Header";
import Loader from "./components/Loader";
import { getEvents } from "./redux/features/eventSlice";
import { AppDispatch, RootState } from "./redux/store/store";

const AppWrapper = styled.div`
  display: grid;
  grid-template-rows: auto 1fr;
`;

function App() {
  const events = useSelector((state: RootState) => state.events.data);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getEvents());
  }, []);

  return (
    <AppWrapper>
      <Header />
      {events.length ? <Outlet /> : <Loader />}
    </AppWrapper>
  );
}

export default App;
