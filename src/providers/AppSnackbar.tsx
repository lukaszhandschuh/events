import { Alert, AlertColor, Snackbar } from "@mui/material";
import { createContext, ReactNode, useContext, useState } from "react";
import { useIntl } from "react-intl";

type TSnackbarProps = {
  showSnackbar: (
    message: string,
    severity?: AlertColor,
    translate?: boolean
  ) => void;
};

type TProps = {
  children: ReactNode;
};

const SnackbarContext = createContext<TSnackbarProps | undefined>(undefined);

export const SnackbarProvider = ({ children }: TProps) => {
  const { formatMessage } = useIntl();

  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState<AlertColor>("success");

  const showSnackbar = (
    message: string,
    severity: AlertColor = "success",
    translate = true
  ) => {
    setMessage(translate ? formatMessage({ id: message }) : message);
    setSeverity(severity);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <SnackbarContext.Provider value={{ showSnackbar }}>
      {children}
      <Snackbar
        anchorOrigin={{ horizontal: "right", vertical: "top" }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity={severity} sx={{ width: "100%" }}>
          {message}
        </Alert>
      </Snackbar>
    </SnackbarContext.Provider>
  );
};

export const useSnackbar = () => {
  const context = useContext(SnackbarContext);
  if (!context) {
    throw new Error("useLocale must be used within a LocaleProvider");
  }
  return context;
};
