// src/store/blogContext.tsx
import React, { createContext, useContext, useState, ReactNode } from "react";

type Blog = {
  id: string;
  username: string;
  title: string;
  blog: string;
  date: string;
};

type BlogContextType = {
  blogs: Blog[];
  addBlog: (blog: Blog) => void;
  removeBlog: (index: number) => void;
};

const BlogContext = createContext<BlogContextType | undefined>(undefined);

export const BlogProvider = ({ children }: { children: ReactNode }) => {
  const [blogs, setBlogs] = useState<Blog[]>(() => {
    const stored = localStorage.getItem("blogs");
    return stored ? JSON.parse(stored) : [];
  });

  const addBlog = (blog: Blog) => {
    const updated = [...blogs, blog];
    setBlogs(updated);
    localStorage.setItem("blogs", JSON.stringify(updated));
  };

  const removeBlog = (index: number) => {
    const updated = blogs.filter((_, i) => i !== index);
    setBlogs(updated);
    localStorage.setItem("blogs", JSON.stringify(updated));
  };

  return (
    <BlogContext.Provider value={{ blogs, addBlog, removeBlog }}>
      {children}
    </BlogContext.Provider>
  );
};

export const useBlogStore = () => {
  const context = useContext(BlogContext);
  if (!context) {
    throw new Error("useBlogStore must be used within BlogProvider");
  }
  return context;
};
