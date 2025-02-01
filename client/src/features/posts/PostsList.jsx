import { useEffect, useState } from "react";
import { fetchAllPosts, deletePost } from "../../services/postService";
import { Link } from "react-router-dom";
import "../../assets/css/PostImage.css";

function PostsList() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  async function fetchPosts() {
    try {
      const data = await fetchAllPosts();
      setPosts(data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }

  const deletePostHandler = async (id) => {
    try {
      await deletePost(id);
      setPosts(posts.filter((post) => post.id !== id));
    } catch (error) {
      setError(error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="posts-list-container">
      {posts.map((post) => (
        <div key={post.id} className="post-container">
          <h2>
            <Link to={`/posts/${post.id}`} className="post-title">
              {post.title}
            </Link>
          </h2>
          {post.image_url ? (
            <div className="post-image-container">
              <img src={post.image_url} alt={post.title} className="post-image" />
            </div>
          ) : (
            <div className="post-image-placeholder">
              <p>No image available</p>
            </div>
          )}
          <div className="post-links">
            <button onClick={() => deletePostHandler(post.id)}>Delete</button>
            <Link to={`/posts/${post.id}/edit`}>Edit</Link>
          </div>
        </div>
      ))}
    </div>
  );
}

export default PostsList;
