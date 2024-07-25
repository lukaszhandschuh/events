import { Chip } from "@mui/material";
import { useIntl } from "react-intl";
import { TColor } from "../models/colors";
import { TEventType } from "../models/event";

type TProps = {
  type: TEventType;
};

function EventType({ type }: TProps) {
  const { formatMessage } = useIntl();

  const getColor = (): TColor => {
    switch (type) {
      case "sport":
        return "primary";
      case "culture":
        return "secondary";
      case "health":
        return "success";
    }
  };

  return (
    <Chip
      style={{ width: 200 }}
      label={formatMessage({ id: type })}
      color={getColor()}
    />
  );
}

export default EventType;
