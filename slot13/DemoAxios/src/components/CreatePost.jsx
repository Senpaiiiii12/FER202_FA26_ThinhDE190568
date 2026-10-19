import { useState } from 'react';
import axios from 'axios';

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = event => {
    event.preventDefault();
    setSubmitting(true);
    setError(null);
    setResult(null);

    axios
      .post('https://jsonplaceholder.typicode.com/posts', {
        title,
        body,
        userId: 1,
      })
      .then(response => {
        setResult({ status: response.status, data: response.data });
        setTitle('');
        setBody('');
      })
      .catch(requestError => setError(requestError.message))
      .finally(() => setSubmitting(false));
  };

  return (
    <section className="container my-4">
      <h2>POST – Tạo bài viết</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label" htmlFor="post-title">
            Title
          </label>
          <input
            id="post-title"
            className="form-control"
            placeholder="Title"
            value={title}
            onChange={event => setTitle(event.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label" htmlFor="post-body">
            Body
          </label>
          <textarea
            id="post-body"
            className="form-control"
            placeholder="Body"
            value={body}
            onChange={event => setBody(event.target.value)}
            required
            rows={4}
          />
        </div>
        <button className="btn btn-primary" type="submit" disabled={submitting}>
          {submitting ? 'Đang gửi...' : 'Tạo bài viết'}
        </button>
      </form>

      {error && <div className="alert alert-danger mt-3">Error: {error}</div>}
      {result && (
        <div className="mt-3">
          <p>Status: {result.status}</p>
          <pre>{JSON.stringify(result.data, null, 2)}</pre>
        </div>
      )}
    </section>
  );
};

export default CreatePost;
