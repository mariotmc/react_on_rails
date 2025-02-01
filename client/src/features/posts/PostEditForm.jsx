import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { fetchPostById, updatePost } from "../../services/postService";
import PostForm from "./PostForm";
import { objectToFormData } from "../../utils/formDataHelper";

function PostEditForm() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const navigate = useNavigate();

  async function fetchCurrentPost() {
    try {
      const json = await fetchPostById(id);
      setPost(json);
    } catch (error) {
      console.error("Failed to fetch post", error);
    }
  }

  const handleUpdateSubmit = async (rawData) => {
    const sanitizedData = {
      title: rawData.title,
      body: rawData.body,
      image: rawData.image,
    };
    const formData = objectToFormData({ post: sanitizedData });

    try {
      const response = await updatePost(id, formData);
      navigate(`/posts/${response.id}`);
    } catch (error) {
      console.error("Failed to update post", error);
    }
  };

  useEffect(() => {
    fetchCurrentPost();
  }, [id]);

  if (!post) return <div>Loading...</div>;

  return <PostForm post={post} headerText="Edit Post" buttonText="Update" onSubmit={handleUpdateSubmit} />;
}

export default PostEditForm;
