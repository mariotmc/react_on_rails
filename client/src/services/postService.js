import { POSTS_API_URL, SEARCH_API_URL } from "../constants";

async function fetchAllPosts(page = 1) {
  const response = await fetch(`${POSTS_API_URL}?page=${page}`);
  if (!response.ok) {
    throw new Error("Failed to fetch posts");
  }
  return response.json();
}

async function fetchPostById(id) {
  const response = await fetch(`${POSTS_API_URL}/${id}`);
  if (!response.ok) {
    throw new Error("Failed to fetch post");
  }
  return response.json();
}

async function createPost(postData) {
  const response = await fetch(POSTS_API_URL, {
    method: "POST",
    body: postData,
  });

  if (!response.ok) {
    throw new Error("Failed to create post");
  }

  return response.json();
}

async function updatePost(id, postData) {
  const response = await fetch(`${POSTS_API_URL}/${id}`, {
    method: "PUT",
    body: postData,
  });

  if (!response.ok) {
    throw new Error("Failed to update post");
  }

  return response.json();
}

async function deletePost(id) {
  const response = await fetch(`${POSTS_API_URL}/${id}`, { method: "DELETE" });

  if (!response.ok) {
    throw new Error("Failed to delete post");
  }

  if (response.status === 204) {
    return null;
  }

  return response.json();
}

async function searchPosts(query, page = 1) {
  const response = await fetch(`${SEARCH_API_URL}?q=${query}&page=${page}`);
  if (!response.ok) {
    throw new Error("Failed to search posts");
  }
  return response.json();
}

export { fetchAllPosts, fetchPostById, deletePost, createPost, updatePost, searchPosts };
