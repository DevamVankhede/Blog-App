import React from "react";
import { useParams } from "react-router-dom";
import data from "./Data.json";

interface BlogType {
  username: string;
  title: string;
  date: string;
  blog: string;
}

export default function Blog() {
  const { id } = useParams<{ id: string }>();

  // Get stored blogs from localStorage
  const storedBlogs = localStorage.getItem("blogs");
  let allBlogs: BlogType[] = [];

  if (storedBlogs) {
    // Merge Data.json blogs with stored blogs
    const customBlogs = JSON.parse(storedBlogs) as BlogType[];
    allBlogs = [...data, ...customBlogs];
  } else {
    allBlogs = data;
  }

  const blog = allBlogs[Number(id)];

  if (!blog) {
    return (
      <div className="text-center text-white mt-10">Blog not found 😢</div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 p-8 text-white">
      <div className="max-w-3xl mx-auto bg-gray-800 p-6 rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold text-indigo-400 mb-4">
          {blog.title}
        </h1>
        <p className="text-gray-400 text-sm mb-2">@{blog.username}</p>
        <p className="text-gray-500 text-xs mb-6">{blog.date}</p>
        <p className="text-lg leading-relaxed">{blog.blog}</p>
      </div>
    </div>
  );
}
