import React, { useState } from 'react';
import Button from '../ui/button';
import AddPostForm from './AddPostForm';
import classes from './AddPost.module.css';
const AddPost = () => {
  const [showAddModal, setAddShowModal] = useState(false);
  
  const onAddPostClick = () => {
    setAddShowModal(true);
  };
  return (
    <section>
      <div className={classes.button}>
        <Button onClick = {onAddPostClick}>Add Post</Button>
      </div>
      {showAddModal && (
        <AddPostForm showModal={showAddModal} setShowModal={setAddShowModal} />
      )}
    </section>
  );
};

export default AddPost;
