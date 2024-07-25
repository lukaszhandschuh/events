import { useSelector } from "react-redux";
import styled from "styled-components";
import EventCard from "../components/EventCard";
import { RootState } from "../redux/store/store";

const CardsWrapper = styled.div`
  padding: 2rem;
  display: flex;
  gap: 4rem;
  flex-wrap: wrap;
  justify-content: center;
`;

function EventsList() {
  const events = useSelector((state: RootState) => state.events.data);

  return (
    <CardsWrapper>
      {events.map((ev) => (
        <EventCard key={ev.id} event={ev} />
      ))}
    </CardsWrapper>
  );
}

export default EventsList;
