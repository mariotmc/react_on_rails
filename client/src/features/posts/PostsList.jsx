import { useEffect, useState } from "react";
import { deletePost } from "../../services/postService";
import { Link } from "react-router-dom";
import "../../assets/css/PostImage.css";
import SearchBar from "../SearchBar";
import usePostsData from "../../hooks/usePostsData";
import useURLSearchParam from "../../hooks/useURLSearchParam";

function PostsList() {
  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useURLSearchParam("search");
  const { posts: fetchedPosts, loading, error } = usePostsData(debouncedSearchTerm);

  const deletePostHandler = async (id) => {
    try {
      await deletePost(id);
      setPosts(posts.filter((post) => post.id !== id));
    } catch (error) {
      setError(error);
    }
  };

  useEffect(() => {
    if (fetchedPosts) {
      setPosts(fetchedPosts);
    }
  }, [fetchedPosts]);

  const handleImmediateSearchChange = (searchValue) => {
    setSearchTerm(searchValue);
  };
  const handleDebouncedSearchChange = (searchValue) => {
    setDebouncedSearchTerm(searchValue);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <>
      <SearchBar
        value={searchTerm}
        onSearchChange={handleDebouncedSearchChange}
        onImmediateSearchChange={handleImmediateSearchChange}
      />
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
    </>
  );
}

export default PostsList;
