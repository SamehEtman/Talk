import { useRouter } from 'next/dist/client/router';
import { signIn } from 'next-auth/client';
import React, { useRef, useState } from 'react';
import classes from './LoginForm.module.css';
const LoginForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const emailRef = useRef();
  const passRef = useRef();
  const router = useRouter();
  const onFormSubmit = async (e) => {
    e.preventDefault();
    const credintials = {
      email: emailRef.current.value,
      password: passRef.current.value,
    };

    if (isLogin) {
      const result = await signIn('credentials', {
        redirect: false,
        ...credintials,
      });
      if (!result.error) router.replace('/posts');
      // notify with correct sign up

      console.log(result);
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
        return alert(data.error || data.message || ' Auth problem');
      }
      data = await response.json();
      // notify with correct sign up
      console.log(data);
      router.replace('/posts');
    }
  };
  return (
    <React.Fragment>
      <h1>{isLogin ? 'Login' : 'Sign up'}</h1>
      <form onSubmit={onFormSubmit}>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input type="email" id="email" ref={emailRef} required />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input type="password" id="password" ref={passRef} required />
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
