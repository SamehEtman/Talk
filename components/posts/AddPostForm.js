import React, { useContext, useEffect, useRef } from 'react';
import { isURL } from 'validator';
import ReactDOM from 'react-dom';
import NotificationContext from '../../store/NotificationContext';
import classes from './AddPostForm.module.css';
const AddPostForm = ({ showModal, setShowModal }) => {
  const titleRef = useRef();
  const summaryRef = useRef();
  const contentRef = useRef();
  const imageRef = useRef();
  const formRef = useRef();
  const notificationContext = useContext(NotificationContext);
  useEffect(() => {
    const onBodyClick = (e) => {
      console.log(e.target);
      if (!formRef.current.contains(e.target)) {
        setShowModal(false);
      }
    };
    document.addEventListener('click', onBodyClick);
    return () => {
      document.removeEventListener('click', onBodyClick);
    };
  }, []);
  const onFormSubmit = async (e) => {
    e.preventDefault();
    const reqBody = {
      title: titleRef.current.value,
      summary: summaryRef.current.value,
      content: contentRef.current.value,
      image: imageRef.current.value,
    };
    if (!isURL(reqBody.image))
      return notificationContext.showNotification({
        status: 'error',
        message: "Can't add the post, Image format is not good",
        title: 'Error',
      });

    notificationContext.showNotification({
      status: 'pending',
      message: 'Adding your post ...',
      title: 'Adding',
    });
    const response = await fetch('/api/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(reqBody),
    });
    if (!response.ok) {
      const data = await response.json();
      notificationContext.showNotification({
        status: 'error',
        message: data.error || "Can't add the post",
        title: 'Error',
      });
      return;
    }
    const data = await response.json();
    notificationContext.showNotification({
      status: 'success',
      message: data.message || 'your post is added succesfully ',
      title: 'Post Added!',
    });
    setShowModal(false);
  };
  return ReactDOM.createPortal(
    <div className={classes.overlay} >
      <form className={classes.auth} ref={formRef} onSubmit={onFormSubmit}>
        <div className={classes.control}>
          <label htmlFor="title">Enter title</label>
          <input type="text" id="title" ref={titleRef} required />
        </div>
        <div className={classes.control}>
          <label htmlFor="summary">Enter summary</label>
          <input type="text" id="summary" ref={summaryRef} required />
        </div>
        <div className={classes.control}>
          <label htmlFor="content">Enter content</label>
          <input type="text" id="content" ref={contentRef} required />
        </div>
        <div className={classes.control}>
          <label htmlFor="image">Enter image link</label>
          <input type="text" id="image" required ref={imageRef} />
        </div>
        <div className={classes.actions}>
          <button>Add Post</button>
        </div>
      </form>
    </div>,
    document.getElementById('modal')
  );
};

export default AddPostForm;
