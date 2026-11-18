import { NotificationManager } from "react-notifications";

export const NotificationSuccess = (message) => {
  return NotificationManager.success(message, "", 3000);
};

export const NotificationError = (message) => {
  return NotificationManager.error(message, "", 3000);
};
