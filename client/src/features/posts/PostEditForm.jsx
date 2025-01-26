import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { fetchPostById, updatePost } from "../../services/postService";

function PostEditForm() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  async function fetchCurrentPost() {
    try {
      const json = await fetchPostById(id);
      setPost(json);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedPost = {
      title: post.title,
      body: post.body,
    };

    try {
      const response = await updatePost(id, updatedPost);
      navigate(`/posts/${response.id}`);
    } catch (error) {
      setError(error);
    }
  };

  useEffect(() => {
    fetchCurrentPost();
  }, [id]);

  if (loading || !post) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h2>Edit Post</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="post-title">Title</label>
          <input
            type="text"
            id="post-title"
            value={post?.title}
            onChange={(e) => setPost({ ...post, title: e.target.value })}
          />
        </div>

        <div>
          <label htmlFor="post-body">Body</label>
          <textarea id="post-body" value={post?.body} onChange={(e) => setPost({ ...post, body: e.target.value })} />
        </div>

        <button type="submit">Save</button>
      </form>
    </div>
  );
}

export default PostEditForm;
