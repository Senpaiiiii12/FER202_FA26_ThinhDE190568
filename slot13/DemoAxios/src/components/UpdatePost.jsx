import React, { useState, useEffect } from 'react';
import axios from 'axios';


const URL = 'https://jsonplaceholder.typicode.com/posts/1';

const UpdatePost = () => {
const [post, setPost] = useState(null);
const [result, setResult] = useState(null);
const [error, setError] = useState(null);

// 1. Lay bai viet cu
useEffect(() => {
axios
.get(URL)
.then(response => setPost(response.data))
.catch(error => setError(error.message));
}, []);

// 2. Cap nhat toan bo bai viet bang PUT
const handleUpdate = () => {
setResult(null);
setError(null);

axios
.put(URL, {
id: post.id,
userId: post.userId,
title: post.title,
body: post.body,
})
.then(response =>
setResult({
status: response.status,
data: response.data,
})
)
.catch(error => setError(error.message));
};

if (error) return <div>Error: {error}</div>;
if (!post) return <div>Loading...</div>;

return (
<div>
<h2>PUT - Cap nhat bai viet #{post.id}</h2>

<label>Title:</label>
<br />
<input
value={post.title}
onChange={e =>
setPost({ ...post, title: e.target.value })
}
/>

<br /><br />

<label>Body:</label>
<br />
<textarea
rows="5"
value={post.body}
onChange={e =>
setPost({ ...post, body: e.target.value })
}
/>

<br /><br />

<button onClick={handleUpdate}>
Cap nhat (PUT)
</button>

{result && (
<div>
<h3>Ket qua</h3>
<p>Status: {result.status}</p>
<pre>{JSON.stringify(result.data, null, 2)}</pre>
</div>
)}
</div>
);
};

export default UpdatePost;