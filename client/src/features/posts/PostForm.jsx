import { useState } from "react";

function PostForm({ post, headerText, onSubmit, buttonText }) {
  const [formData, setFormData] = useState(post || { title: "", body: "", image: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <h2>{headerText}</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit(formData);
        }}
      >
        <div>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          />
        </div>

        <div>
          <label htmlFor="image">Image</label>
          <input
            type="file"
            id="image"
            accept="image/*"
            onChange={(e) => setFormData({ ...formData, image: e.target.files[0] })}
          />
        </div>

        <div>
          <label htmlFor="body">Body</label>
          <textarea
            id="body"
            value={formData.body}
            onChange={(e) => setFormData({ ...formData, body: e.target.value })}
          />
        </div>

        <div>
          <button type="submit">{buttonText}</button>
        </div>
      </form>
    </div>
  );
}

export default PostForm;
