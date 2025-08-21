import axios from "axios";

// Base API URL from environment
const API_URL = process.env.REACT_APP_API_URL as string;
console.log("API_URL is:", API_URL);

// Create a blog
export async function createBlog(blog: any) {
  return axios.post(`${API_URL}/api/blogs`, blog);
}

// Fetch all blogs
export async function fetchBlogs() {
  return axios.get(`${API_URL}/api/blogs`);
}

// Delete a blog
export async function deleteBlog(id: string) {
  return axios.delete(`${API_URL}/api/blogs/${id}`);
}

// Get a blog by ID
export async function getBlogById(id: string) {
  return axios.get(`${API_URL}/api/blogs/${id}`);
}

// Update a blog
export async function updateBlog(id: string, blog: any) {
  return axios.put(`${API_URL}/api/blogs/${id}`, blog);
}
