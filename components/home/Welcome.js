import classes from './Welcome.module.css';
import { useSession } from 'next-auth/client';
import Link from 'next/dist/client/link';
function Welcome() {
  const [session, loading] = useSession();
  return (
    <section className={classes.starting}>
      <h1>Welcome on Board!</h1>
      {!session && (
        <h1 className = {classes.link}>
          <Link href="/auth">Sign up now!</Link>
        </h1>
      )}
    </section>
  );
}

export default Welcome;
