import React, { useContext } from 'react';
import NotificationContext from '../../store/NotificationContext';
import Notification from '../ui/notification';
import MainNav from './MainNav';

const Layout = (props) => {
  const { activeNotification } = useContext(NotificationContext);
  return (
    <React.Fragment>
      <MainNav />
      <main>{props.children}</main>
      {activeNotification && (
        <Notification
          title={activeNotification.title}
          message={activeNotification.message}
          status={activeNotification.status}
        />
      )}
    </React.Fragment>
  );
};

export default Layout;
