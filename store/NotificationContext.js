import React, { useEffect, useState } from 'react';

const NotificationContext = React.createContext({
  activeNotification: null,
  showNotification: (notificationData) => {},
  hideNotification: () => {},
});

export const NotificationContextProvider = (props) => {
  const [activeNotification, setactiveNotification] = useState(null);
  const showNotification = (notificationData) => {
    setactiveNotification(notificationData);
  };
  const hideNotification = () => {
    setactiveNotification(null);
  };
  useEffect(() => {
    let timeoutId;
    if (activeNotification) {
      timeoutId = setTimeout(hideNotification, 2000);
    }
    return () => clearTimeout(timeoutId);
  }, [activeNotification]);
  const context = {
    activeNotification,
    showNotification,
    hideNotification,
  };
  return (
    <NotificationContext.Provider value={context}>
      {props.children}
    </NotificationContext.Provider>
  );
};

export default NotificationContext;
