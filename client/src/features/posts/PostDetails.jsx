import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { fetchPostById, deletePost as deletePostService } from "../../services/postService";

function PostDetails() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchCurrentPost = async () => {
    try {
      const data = await fetchPostById(id);
      setPost(data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const deletePost = async () => {
    try {
      await deletePostService(id);
      navigate("/");
    } catch (error) {
      setError(error);
    }
  };

  useEffect(() => {
    fetchCurrentPost();
  }, [id]);

  if (loading) return <h2>Loading...</h2>;
  if (error) return <h2>Error: {error}</h2>;

  return (
    <div>
      <h2>{post.title}</h2>
      <p>{post.body}</p>
      <Link to={`/posts/${post.id}/edit`}>Edit</Link>
      {" | "}
      <Link to="/">Back to Home</Link>
      {" | "}
      <button onClick={() => deletePost(post.id)}>Delete</button>
    </div>
  );
}

export default PostDetails;
