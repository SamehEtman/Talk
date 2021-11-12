import { useState } from 'react';
import classes from './PostBody.module.css';
import UpdateButton from './UpdateButton';
import UpdateForm from './UpdateForm';
const Profile = ({ user }) => {
  const [isUpdate, setIsUpdate] = useState(false);
  return (
    <section>
      {isUpdate && <UpdateForm setIsUpdate={setIsUpdate} />}
      <div className={classes.summary}>
        <h1>{user.username}</h1>
      </div>
      <div className={classes.logistics}>
        <ul className={classes.list}>
          <li className={classes.item}>
            <span className={classes.content}>Email : {user.email}</span>
          </li>
          <li className={classes.item}>
            <span className={classes.content}>Username : {user.username}</span>
          </li>
          <li className={classes.item}>
            <span className={classes.content}>Password : ********</span>
          </li>
          <li className={classes.item}>
            <UpdateButton setIsUpdate={setIsUpdate} />
          </li>
        </ul>
      </div>
    </section>
  );
};

export default Profile;
