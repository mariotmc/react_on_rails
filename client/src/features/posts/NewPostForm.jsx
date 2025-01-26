import { useNavigate } from "react-router-dom";
import { createPost } from "../../services/postService";
import PostForm from "./PostForm";

function NewPostForm() {
  const navigate = useNavigate();

  const handleCreateSubmit = async (rawData) => {
    const formData = new FormData();
    formData.append("post[title]", rawData.title);
    formData.append("post[body]", rawData.body);
    formData.append("post[image]", rawData.image);

    try {
      const response = await createPost(formData);
      navigate(`/posts/${response.id}`);
    } catch (error) {
      console.error("Failed to create post", error);
    }
  };

  return <PostForm headerText="Create a New Post" buttonText="Create" onSubmit={handleCreateSubmit} />;
}

export default NewPostForm;
