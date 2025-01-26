import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createPost } from "../../services/postService";

function NewPostForm() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const postData = { title, body };

    try {
      const response = await createPost(postData);
      navigate(`/posts/${response.id}`);
    } catch (error) {
      console.error("Failed to create post", error);
    }
  };

  return (
    <div>
      <h2>New Post</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title</label>
          <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>

        <div>
          <label htmlFor="body">Body</label>
          <textarea id="body" value={body} onChange={(e) => setBody(e.target.value)} required />
        </div>

        <div>
          <button type="submit">Create Post</button>
        </div>
      </form>
    </div>
  );
}

export default NewPostForm;
