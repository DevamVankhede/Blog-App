import axios from "axios";

const API_URL =
  process.env.REACT_APP_API_URL || "http://localhost:8000/api/blogs";

export async function createBlog(blog: any) {
  return axios.post(API_URL, blog);
}

export async function fetchBlogs() {
  return axios.get(API_URL);
}

export async function deleteBlog(id: string) {
  return axios.delete(`${API_URL}/${id}`);
}

export async function getBlogById(id: string) {
  return axios.get(`${API_URL}/${id}`);
}

export async function updateBlog(id: string, blog: any) {
  return axios.put(`${API_URL}/${id}`, blog);
}
