import { useRouter } from 'next/dist/client/router';
import { signIn } from 'next-auth/client';
import { isEmail } from 'validator';
import React, { useContext, useRef, useState } from 'react';
import classes from './LoginForm.module.css';
import NotificationContext from '../../store/NotificationContext';

const LoginForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const emailRef = useRef();
  const passRef = useRef();
  const router = useRouter();
  const notificationContext = useContext(NotificationContext);

  const onFormSubmit = async (e) => {
    e.preventDefault();
    let flag = false;
    const credintials = {
      email: emailRef.current.value,
      password: passRef.current.value,
    };

    if (isEmail(credintials.email) && credintials.password.length >= 8) {
      notificationContext.showNotification({
        status: 'pending',
        message: 'Processing ... ',
        title: 'Processing your data',
      });
      if (isLogin) {
        const result = await signIn('credentials', {
          redirect: false,
          ...credintials,
        });
        if (!result.error) {
          router.reload('/posts');
          notificationContext.showNotification({
            status: 'success',
            message: 'Welcome back ',
            title: 'Signed In!',
          });
          return;
        }
        notificationContext.showNotification({
          status: 'error',
          message: result.error || 'Auth problem',
          title: 'Sign failed !',
        });
      } else {
        const response = await fetch('/api/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(credintials),
        });
        let data;
        if (!response.ok) {
          // error
          const data = await response.json();
          notificationContext.showNotification({
            status: 'error',
            message: data.error || 'Auth problem',
            title: 'Sign failed !',
          });
          return;
        }
        data = await response.json();
        const result = await signIn('credentials', {
          redirect: false,
          ...credintials,
        });
        // notify with correct sign up
        router.reload('/posts');
        notificationContext.showNotification({
          status: 'success',
          message: 'Signing up completed',
          title: 'Signed up!',
        });
      }
    } else {
      notificationContext.showNotification({
        status: 'error',
        message: 'Validation problem',
        title: `${isLogin ? 'Login' : 'Sign up'} failed !`,
      });
    }
  };
  const onEmailChange = () => {
    if (!isEmail(emailRef.current.value)) {
      emailRef.current.style.backgroundColor = '#ffc6c6';
      return;
    }
    emailRef.current.style.backgroundColor = '';
  };
  const onPasswordChange = () => {
    if (passRef.current.value.length < 8) {
      passRef.current.style.backgroundColor = '#ffc6c6';
      return;
    }
    passRef.current.style.backgroundColor = '';
  };
  return (
    <React.Fragment>
      <h1>{isLogin ? 'Login' : 'Sign up'}</h1>
      <form onSubmit={onFormSubmit}>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input
            type="email"
            id="email"
            onChange={onEmailChange}
            ref={emailRef}
            required
          />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input
            type="password"
            id="password"
            onChange={onPasswordChange}
            ref={passRef}
            required
          />
        </div>
        <div className={classes.actions}>
          <button>{isLogin ? 'Log in' : 'Create Account'}</button>
          <button
            type="button"
            className={classes.toggle}
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? 'Create new account' : 'I have an account'}
          </button>
        </div>
      </form>
    </React.Fragment>
  );
};

export default LoginForm;
