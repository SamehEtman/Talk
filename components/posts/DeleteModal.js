import { useRouter } from 'next/dist/client/router';
import { useContext } from 'react';
import ReactDOM from 'react-dom';
import NotificationContext from '../../store/NotificationContext';
import classes from './AddPostForm.module.css';
const DeleteModal = ({ id, setShowDelete }) => {
  const notificationContext = useContext(NotificationContext);
  const router = useRouter();
  const onNoDeleteClick = () => {
    setShowDelete(false);
  };
  const onYesDeleteClick = async () => {
    notificationContext.showNotification({
      status: 'pending',
      message: 'deleting selected post',
      title: 'Deleteing ...',
    });
    const response = await fetch(`/api/posts/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      const data = await response.json();
      notificationContext.showNotification({
        status: 'error',
        message: data.error || 'Cannot delete this post',
        title: 'Deleteing failed!',
      });
    }
    const data = await response.json();
    notificationContext.showNotification({
      status: 'success',
      message: data.message || 'post deleted successfully',
      title: 'Post Deleted !',
    });
    setShowDelete(false);
    router.reload();
  };
  return ReactDOM.createPortal(
    <div className={classes.overlay}>
      <div className={classes.auth}>
        <div className={classes.actions}>
          <h1>Are you sure you want to delete this blog ?</h1>
        </div>
        <div className={classes.actions}>
          <button onClick={onYesDeleteClick}>Yes</button>
        </div>
        <div className={classes.actions}>
          <button onClick={onNoDeleteClick}>No</button>
        </div>
      </div>
    </div>,
    document.getElementById('modal')
  );
};

export default DeleteModal;
