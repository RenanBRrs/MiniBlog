import React, { useState } from 'react';
import styles from './Home.module.css';
import { useNavigate, Link } from 'react-router-dom';
import { useFetchDocuments } from '../../hooks/useFetchDocuments';
import PostDetails from '../../components/PostDetails';

const Home = () => {
  const [query, setQuery] = useState('');
  const { documents: posts, loading } = useFetchDocuments('posts');

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (query) {
      return navigate(`/search?q=${query}`);
    }
  };
  return (
    <div className={styles.home}>
      <h1>See our most recent posts</h1>
      <form onSubmit={handleSubmit} className={styles.search_form}>
        <input
          type='text'
          placeholder='Or find tags...'
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className='btn btn-dark'>Find</button>
      </form>
      <div>
        {loading && <p>Loading...</p>}
        {posts &&
          posts.map((post) => <PostDetails key={post.id} post={post} />)}
        {posts && posts.length === 0 && (
          <div className={styles.noposts}>
            <p>Posts Not Found!</p>
            <Link to='/posts/create' className='btn'>
              Create the first post
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
