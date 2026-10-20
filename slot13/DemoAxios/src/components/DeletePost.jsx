
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API = 'https://jsonplaceholder.typicode.com/posts';

const DeletePost = () => {
  const [posts, setPosts] = useState([]);
  const [message, setMessage] = useState('');
  const [error, setError] = useState(null);

  // 1. Lay 5 bai viet dau tien
  useEffect(() => {
    axios
      .get(API, { params: { _limit: 5 } })
      .then(response => setPosts(response.data))
      .catch(error => setError(error.message));
  }, []);

  // 2. Xoa bai viet
  const handleDelete = (id) => {
    if (!window.confirm(`Xoa bai viet #${id}?`)) {
      return;
    }

    setMessage('');
    setError(null);

    axios
      .delete(`${API}/${id}`)
      .then(response => {
        setPosts(oldPosts =>
          oldPosts.filter(post => post.id !== id)
        );

        setMessage(
          `Da xoa bai #${id} - Status: ${response.status}`
        );
      })
      .catch(error => setError(error.message));
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>DELETE - Xoa bai viet</h2>

      {message && <p>{message}</p>}

      {posts.length === 0 && (
        <p>Dang tai du lieu hoac khong con bai viet.</p>
      )}

      <ul>
        {posts.map(post => (
          <li key={post.id}>
            #{post.id} - {post.title}{' '}
            <button onClick={() => handleDelete(post.id)}>
              Xoa
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DeletePost;
