import { API_URL } from "../constants";

async function fetchAllPosts() {
  const response = await fetch(`${API_URL}`);
  if (!response.ok) {
    throw new Error("Failed to fetch posts");
  }
  return response.json();
}

async function fetchPostById(id) {
  const response = await fetch(`${API_URL}/${id}`);
  if (!response.ok) {
    throw new Error("Failed to fetch post");
  }
  return response.json();
}

async function deletePost(id) {
  const response = await fetch(`${API_URL}/${id}`, { method: "DELETE" });

  if (!response.ok) {
    throw new Error("Failed to delete post");
  }

  if (response.status === 204) {
    return null;
  }

  return response.json();
}

export { fetchAllPosts, fetchPostById, deletePost };
