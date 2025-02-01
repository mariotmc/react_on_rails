import { useEffect, useState } from "react";
import { deletePost } from "../../services/postService";
import { Link, useSearchParams } from "react-router-dom";
import SearchBar from "./SearchBar";
import usePostsData from "../../hooks/usePostsData";
import useURLSearchParam from "../../hooks/useURLSearchParam";
import Pagination from "./Pagination";

function PostsList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useURLSearchParam("search");
  const [searchParams, setSearchParams] = useSearchParams();
  const initialPageFromURL = Number(searchParams.get("page")) || 1;
  const [currentPage, setCurrentPage] = useState(initialPageFromURL);
  const [posts, setPosts] = useState([]);
  const { posts: fetchedPosts, totalPosts, loading, error, perPage } = usePostsData(debouncedSearchTerm, currentPage);
  const handleImmediateSearchChange = (searchValue) => {
    setSearchTerm(searchValue);
  };
  const handleDebouncedSearchChange = (searchValue) => {
    setDebouncedSearchTerm(searchValue);
  };
  const handlePageChange = (page) => {
    setCurrentPage(page);
    setSearchParams({ search: debouncedSearchTerm, page });
  };
  const deletePostHandler = async (id) => {
    try {
      await deletePost(id);
      setPosts((prevPosts) => prevPosts.filter((post) => post.id !== id));
    } catch (error) {
      setError(error);
    }
  };

  useEffect(() => {
    if (fetchedPosts) {
      setPosts(fetchedPosts);
    }
  }, [fetchedPosts]);

  useEffect(() => {
    const initialSearchTerm = searchParams.get("search") || "";
    setSearchTerm(initialSearchTerm);

    const pageFromURL = searchParams.get("page") || 1;
    setCurrentPage(Number(pageFromURL));
  }, [searchParams]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <>
      <SearchBar
        value={searchTerm}
        onSearchChange={handleDebouncedSearchChange}
        onImmediateSearchChange={handleImmediateSearchChange}
      />
      <Pagination
        currentPage={currentPage}
        totalPosts={totalPosts}
        postsPerPage={perPage}
        onPageChange={handlePageChange}
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
