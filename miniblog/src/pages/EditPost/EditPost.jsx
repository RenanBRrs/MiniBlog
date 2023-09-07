import styles from './EditPost.module.css';

import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuthValue } from '../../context/AuthContext';
import { useUpdateDocument } from '../../hooks/useUpdateDocument';
import { useFetchDocument } from '../../hooks/useFetchDocument';

const EditPost = () => {
  const { id } = useParams();
  const { document: post } = useFetchDocument('posts', id);
  const [title, setTitle] = useState('');
  const [image, setImage] = useState('');
  const [body, setBody] = useState('');
  const [tags, setTags] = useState([]);
  const [formError, setFormError] = useState('');

  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setBody(post.body);
      setImage(post.image);

      const textTags = post.tagsArray.join(', ');
      setTags(textTags);
    }
  }, [post]);

  const { user } = useAuthValue();

  const { updateDocument, response } = useUpdateDocument('posts');

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
    const data = {
      title,
      image,
      body,
      tagsArray,
      uid: user.uid,
      createdBy: user.displayName,
    };
    updateDocument(id, data);

    // Redirect to home page
    navigate('/dashboard');
  };

  return (
    <div className={styles.edit_post}>
      {post && (
        <>
          <h2>Edit Post: {post.title}</h2>
          <p>Change data how you want!</p>
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
            <p className={styles.preview_title}>Preview actual image: </p>
            <img
              className={styles.image_preview}
              src={post.image}
              alt={post.title}
            />
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

            {!response.loading && <button className='btn'>Edit</button>}
            {response.loading && (
              <button className='btn' disabled>
                Wait...
              </button>
            )}
            {response.error && <p className='error'>{response.error}</p>}
            {formError && <p className='error'>{formError}</p>}
          </form>
        </>
      )}
    </div>
  );
};

export default EditPost;
