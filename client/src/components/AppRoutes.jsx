import React from "react";
import { Routes, Route } from "react-router-dom";
import PostsList from "../features/posts/PostsList";
// import NewPost from "../features/posts/NewPost";
import PostDetails from "../features/posts/PostDetails";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<PostsList />} />
      <Route path="/posts/:id" element={<PostDetails />} />
      <Route path="/new" element={<h1>New Post</h1>} />
    </Routes>
  );
}

export default AppRoutes;
