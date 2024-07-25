import { Typography } from "@mui/material";
import { useEffect } from "react";
import { FormattedDate, FormattedMessage, useIntl } from "react-intl";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import EventType from "../components/EventType";
import ImagePlaceholder from "../components/ImagePlaceholder";
import Loader from "../components/Loader";
import useViewportWidth from "../helpers/viewport";
import { clearSelectedEvent, getEvent } from "../redux/features/eventSlice";
import { AppDispatch, RootState } from "../redux/store/store";

const DetailsWrapper = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const TitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

function EventDetails() {
  const { id } = useParams<{ id: string }>();
  const { formatMessage } = useIntl();
  const dispatch = useDispatch<AppDispatch>();
  const event = useSelector((state: RootState) => state.events.selectedEvent);
  const viewportWidth = useViewportWidth();

  useEffect(() => {
    const eventId = Number(id);

    if (Number.isNaN(eventId)) {
      return;
    }
    dispatch(getEvent(eventId));

    return () => {
      dispatch(clearSelectedEvent());
    };
  }, []);

  return (
    <>
      {event ? (
        <DetailsWrapper>
          <TitleWrapper>
            <Typography variant="h2">{event.title}</Typography>
            <EventType type={event.type} />
          </TitleWrapper>

          <Typography variant="body1">
            {event.address}
            <br />
            <FormattedDate
              value={event.date}
              year="numeric"
              month="long"
              day="2-digit"
              hour="2-digit"
              minute="2-digit"
            />
          </Typography>

          <br />
          <ImagePlaceholder
            width={`calc(${viewportWidth}px - 2rem)`}
            height={200}
            alt={formatMessage({ id: "eventImage" })}
            src={`https://picsum.photos/${viewportWidth}/400`}
          />

          <br />
          <Typography variant="body1">
            {event.description}
            <br />
            <br />
            <FormattedMessage id="contact" />
            <br />
            {event.phoneNumber}
            <br />
            {event.email}
          </Typography>
        </DetailsWrapper>
      ) : (
        <Loader />
      )}
    </>
  );
}

export default EventDetails;
