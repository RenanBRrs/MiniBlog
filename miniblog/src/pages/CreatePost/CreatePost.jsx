import styles from './CreatePost.module.css';

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthValue } from '../../context/AuthContext';
import { useInsertDocument } from '../../hooks/useInsertDocument';

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [image, setImage] = useState('');
  const [body, setBody] = useState('');
  const [tags, setTags] = useState([]);
  const [formError, setFormError] = useState('');

  const { user } = useAuthValue();

  const { insertDocument, response } = useInsertDocument('posts');

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError('');

    // Validate image URL
    try {
      new URL(image);
    } catch (error) {
      setFormError('The image needs to be a URL');
    }

    // Create array of tags
    const tagsArray = tags.split(',').map((tags) => tags.trim().toLowerCase());

    // Check every values
    if (!title || !image || !body || !tags) {
      setFormError('Please fill in all fields!');
    }
    if (formError) return;

    insertDocument({
      title,
      image,
      body,
      tagsArray,
      uid: user.uid,
      createdBy: user.displayName,
    });

    // Redirect to home page
    navigate('/');
  };

  return (
    <div className={styles.create_post}>
      <h2>Create Post</h2>
      <p>Write about anything and share your knowledge</p>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Title:</span>
          <input
            type='text'
            name='title'
            required
            placeholder='Think a good title...'
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
        </label>
        <label>
          <span>Image URL:</span>
          <input
            type='text'
            name='image'
            required
            placeholder='Put a good image about your post...'
            onChange={(e) => setImage(e.target.value)}
            value={image}
          />
        </label>
        <label>
          <span>Content:</span>
          <textarea
            name='body'
            required
            placeholder='Insert the post content'
            onChange={(e) => setBody(e.target.value)}
            value={body}></textarea>
        </label>
        <label>
          <span>Tags:</span>
          <input
            type='text'
            name='tags'
            required
            placeholder='Put the tags sepate with commas'
            onChange={(e) => setTags(e.target.value)}
            value={tags}
          />
        </label>

        {!response.loading && <button className='btn'>Create</button>}
        {response.loading && (
          <button className='btn' disabled>
            Wait...
          </button>
        )}
        {response.error && <p className='error'>{response.error}</p>}
        {formError && <p className='error'>{formError}</p>}
      </form>
    </div>
  );
};

export default CreatePost;
