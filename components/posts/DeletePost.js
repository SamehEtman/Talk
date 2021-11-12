import { useState } from 'react';
import DeleteModal from './DeleteModal';
import classes from './PostItem.module.css';
const DeletePost = ({ id }) => {
  const [showDelete, setShowDelete] = useState(false);
  return (
    <div>
      <div className={classes.actions}>
        <button
          className={`${classes.red} ${classes.btn}`}
          onClick={() => setShowDelete(true)}
        >
          <span>delete Post</span>
          <span className={classes.icon}>
            <i className="fa fa-trash"></i>
          </span>
        </button>
      </div>
      {showDelete && <DeleteModal id={id} setShowDelete = {setShowDelete} />}
    </div>
  );
};
export default DeletePost;
