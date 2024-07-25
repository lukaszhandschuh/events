import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Typography,
} from "@mui/material";
import { FormattedDate, FormattedMessage } from "react-intl";
import { TEvent } from "../models/event";
import StyledLink from "./StyledLink";

type TProps = {
  event: TEvent;
};

function EventCard({ event }: TProps) {
  return (
    <Card sx={{ width: 400 }}>
      <CardHeader
        title={event.title}
        subheader={
          <FormattedDate
            value={event.date}
            year="numeric"
            month="long"
            day="2-digit"
            hour="2-digit"
            minute="2-digit"
          />
        }
      />
      <CardMedia sx={{ height: 200 }} image={event.image} />
      <CardContent
        sx={{
          display: "-webkit-box",
          WebkitBoxOrient: "vertical",
          WebkitLineClamp: 4,
          overflow: "hidden",
          textOverflow: "ellipsis",
          paddingBottom: 0,
        }}
      >
        <Typography variant="body2">{event.description}</Typography>
      </CardContent>
      <CardActions>
        <StyledLink to={`${event.id}`}>
          <Button size="small">
            <FormattedMessage id="more" />
          </Button>
        </StyledLink>
        <Button size="small">
          <FormattedMessage id="share" />
        </Button>
      </CardActions>
    </Card>
  );
}

export default EventCard;
