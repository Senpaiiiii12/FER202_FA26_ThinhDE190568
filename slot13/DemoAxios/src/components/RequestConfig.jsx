import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RequestConfig = () => {
  const [info, setInfo] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios({
      method: 'get',
      url: 'https://jsonplaceholder.typicode.com/posts',
      params: {
        _page: 1,
        _limit: 3,
      },
      headers: {
        Accept: 'application/json',
        Authorization: 'Bearer demo-token-123',
      },
      timeout: 5000,
    })
      .then(response => {
        setInfo({
          status: response.status,
          contentType: response.headers['content-type'],
          total: response.headers['x-total-count'],
          data: response.data,
        });
      })
      .catch(error => {
        if (error.code === 'ECONNABORTED') {
          setError('Request qua thoi gian (timeout)');
        } else if (error.response) {
          setError(`Server tra loi loi ${error.response.status}`);
        } else {
          setError(error.message);
        }
      });
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!info) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Cau hinh request</h2>

      <p>Status: {info.status}</p>

      <p>Content-Type: {info.contentType}</p>

      <p>
        Tong so bai viet (x-total-count): {info.total ?? 'Khong co header'}
      </p>

      <h3>Danh sach bai viet</h3>

      <ul>
        {info.data.map(post => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>

      <h3>Response data</h3>

      <pre>{JSON.stringify(info.data, null, 2)}</pre>
    </div>
  );
};

export default RequestConfig;
