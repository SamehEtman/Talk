import React, { useState } from 'react';
import Button from '../ui/button';
import AddPostForm from './AddPostForm';
import classes from './AddPost.module.css';
const AddPost = () => {
  const [showModal, setShowModal] = useState(false);
  const onAddPostClick = () => {
    setShowModal(true);
  };
  return (
    <section>
      <div className={classes.button}>
        <Button onClick = {onAddPostClick}>Add Post</Button>
      </div>
      {showModal && (
        <AddPostForm showModal={showModal} setShowModal={setShowModal} />
      )}
    </section>
  );
};

export default AddPost;
