import { useContext, useEffect, useRef } from 'react';
import { getSession } from 'next-auth/client';

import ReactDOM from 'react-dom';
import classes from './UpdateForm.module.css';
import { useRouter } from 'next/dist/client/router';
import NotificationContext from '../../store/NotificationContext';

const UpdateForm = ({ setIsUpdate }) => {
  const usernameRef = useRef();
  const currentPasswordRef = useRef();
  const newPasswordRef = useRef();
  const formRef = useRef();
  const router = useRouter();
  const notificationContext = useContext(NotificationContext);
  const onFormSubmit = async (e) => {
    e.preventDefault();
    const { user } = await getSession();
    if (!user) router.replace('/auth');

    const reqBody = {
      username: usernameRef.current.value,
      currentPassword: currentPasswordRef.current.value,
      newPassword: newPasswordRef.current.value,
      email: user.email,
    };
    if (
      reqBody.currentPassword === reqBody.newPassword ||
      reqBody.currentPassword.length < 8 ||
      reqBody.newPassword.length < 8
    )
      return notificationContext.showNotification({
        status: 'error',
        message: 'Current and new password are equal or less than 8',
        title: 'Updating failed',
      });
    notificationContext.showNotification({
      status: 'pending',
      message: 'Performing changes ...',
      title: 'Updating!',
    });
    const response = await fetch('/api/profile', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(reqBody),
    });
    if (!response.ok) {
      const data = await response.json();
      return notificationContext.showNotification({
        status: 'error',
        message: data.error || 'Error with updating',
        title: 'Updating failed',
      });
    }
    const data = await response.json();

    notificationContext.showNotification({
      status: 'success',
      message: 'Changes accepted ...',
      title: 'Update Done!',
    });
    setIsUpdate(false);
  };

  useEffect(() => {
    const onBodyClick = (e) => {
      if (!formRef.current.contains(e.target)) {
        setIsUpdate(false);
      }
    };
    console.log('here');
    addEventListener('mousedown', onBodyClick);
    console.log('now');
    return () => {
      console.log('cleared');
      removeEventListener('mousedown', onBodyClick);
    };
  }, []);

  const onPasswordChange = (ref) => {
    console.log(ref.current.value);
    if (ref.current.value.length < 8) {
      return (ref.current.style.backgroundColor = '#ffc6c6');
    }
    ref.current.style.backgroundColor = '';
  };
  return ReactDOM.createPortal(
    <div className={classes.overlay}>
      <form className={classes.auth} ref={formRef} onSubmit={onFormSubmit}>
        <div className={classes.control}>
          <label htmlFor="username">Username *</label>
          <input type="text" id="username" ref={usernameRef} required />
        </div>
        <div className={classes.control}>
          <label htmlFor="currentPassword">Current Password *</label>
          <input
            type="password"
            ref={currentPasswordRef}
            onChange={() => onPasswordChange(currentPasswordRef)}
            id="currentPassword"
            required
          />
        </div>
        <div className={classes.control}>
          <label htmlFor="newPassword">New Password *</label>
          <input
            type="password"
            ref={newPasswordRef}
            onChange={() => onPasswordChange(newPasswordRef)}
            id="newPassword"
            required
          />
        </div>
        <div className={classes.actions}>
          <button>Update Profile</button>
        </div>
      </form>
    </div>,
    document.getElementById('modal')
  );
};

export default UpdateForm;
