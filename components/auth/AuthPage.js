import LoginForm from './LoginForm';
import classes from './LoginForm.module.css';
const AuthForm = () => {
  return (
    <section className={classes.auth}>
      <LoginForm />
    </section>
  );
};

export default AuthForm;
