import React from 'react';
import classes from './LoginForm.module.css';
const LoginForm = () => {
  return (
    <React.Fragment>
      <h1>Login</h1>
      <form>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input type="email" id="email" required />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input type="password" id="password" required />
        </div>
        <div className={classes.actions}>
          <button>Create Account</button>
          <button type="button" className={classes.toggle}>
            Create new account
          </button>
        </div>
      </form>
    </React.Fragment>
  );
};

export default LoginForm;
