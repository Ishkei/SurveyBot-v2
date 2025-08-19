import React, { useCallback, useState } from "react";
import IconButton from "@mui/material/IconButton";
import Snackbar from "@mui/material/Snackbar";
import SnackbarContent from "@mui/material/SnackbarContent";
import { ReactComponent as CheckCircleIcon } from "../assets/CheckCircleIcon.svg";
import { ReactComponent as ErrorIcon } from "../assets/ErrorCircleIcon.svg";
import { ReactComponent as InfoIcon } from "../assets/InfoIcon.svg";
import { ReactComponent as WarningIcon } from "../assets/WarningIcon.svg";
import { ReactComponent as CloseIcon } from "../assets/ChildChipExitIcon.svg";
import "./PopupMessageContext.scss";

interface MessageType {
  id: number;
  type: "" | "success" | "warn" | "error" | "info";
  message: string;
}

interface Props {
  children: React.ReactNode;
}

interface MessageContextType {
  showMessage: (
    message: string,
    type: "success" | "warn" | "error" | "info"
  ) => void;
}

const variantIcon = {
  success: CheckCircleIcon,
  warn: WarningIcon,
  error: ErrorIcon,
  info: InfoIcon,
};

export const PopupMessageContext = React.createContext<MessageContextType>({
  showMessage: () => {},
});

function PopupMessageProvider({children }: Props) {
  const [dismissedMessage, setDismissedMessage] = React.useState<number>();
  const [message, setMessage] = useState<MessageType>({
    id: 0,
    type: "",
    message: "",
  });
  const handleMessageClose = () => {
    if (message?.id) setDismissedMessage(message.id);
  };

  const showMessage = useCallback(
    (message: string, type: "success" | "warn" | "error" | "info") => {
      setMessage((prevMessage: MessageType) => ({
        id: ++prevMessage.id,
        type,
        message,
      }));
    },
    []
  );

  const Icon = message?.type ? variantIcon[message.type] : InfoIcon;

  return (
    <PopupMessageContext.Provider
      value={{
        showMessage,
      }}
    >
      <Snackbar
        className="popup-message"
        open={Boolean(message.id && dismissedMessage !== message.id)}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        autoHideDuration={6000}
        onClose={handleMessageClose}
      >
        <SnackbarContent
          className={message.type}
          message={
            <span className="message-content">
              {Boolean(Icon) && <Icon className={"popup-icon icon-variant"} />}
              {message.message}
            </span>
          }
          action={[
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              className={"close"}
              onClick={handleMessageClose}
            >
              <CloseIcon />
            </IconButton>,
          ]}
        />
      </Snackbar>
      {children}
    </PopupMessageContext.Provider>
  );
}

export default PopupMessageProvider;
