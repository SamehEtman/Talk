import Button from '../ui/button';
import classes from './UpdateButton.module.css';
const UpdateButton = ({ setIsUpdate }) => {
  return (
    <section>
      <div className={classes.left}>
        <button className={classes.btn} onClick={() => setIsUpdate(true)}>
          Edit Profile
        </button>
      </div>
    </section>
  );
};

export default UpdateButton;
