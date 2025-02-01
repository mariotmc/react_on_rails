import { useNavigate } from "react-router-dom";
import { createPost } from "../../services/postService";
import PostForm from "./PostForm";
import { objectToFormData } from "../../utils/formDataHelper";

function NewPostForm() {
  const navigate = useNavigate();

  const handleCreateSubmit = async (rawData) => {
    try {
      const formData = objectToFormData({ post: rawData });
      const response = await createPost(formData);
      navigate(`/posts/${response.id}`);
    } catch (error) {
      console.error("Failed to create post", error);
    }
  };

  return <PostForm headerText="Create a New Post" buttonText="Create" onSubmit={handleCreateSubmit} />;
}

export default NewPostForm;
