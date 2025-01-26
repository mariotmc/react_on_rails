import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { API_URL } from "../../constants";

function PostEditForm() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchCurrentPost() {
      try {
        const response = await fetch(`${API_URL}/${id}`);
        if (response.ok) {
          const json = await response.json();
          setPost(json);
        } else {
          setError(new Error("Failed to fetch post"));
        }
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    }

    fetchCurrentPost();
  }, [id]);

  if (loading || !post) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: post.title, body: post.body }),
      });
      if (response.ok) {
        const json = await response.json();
        setPost(json);
        navigate(`/posts/${id}`);
      } else {
        setError(new Error("Failed to update post"));
      }
    } catch (error) {
      setError(error);
    }
  };

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
