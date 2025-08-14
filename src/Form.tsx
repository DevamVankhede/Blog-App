import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  username: z
    .string({ message: "username required" })
    .min(3, { message: "Username must be at least 3 characters" }),
  title: z
    .string({ message: "title required" })
    .min(3, { message: "Title must be at least 3 characters" }),
  blog: z
    .string({ message: "blog required" })
    .min(250, { message: "Blog must be at least 250 characters" }),
});

type FormData = z.infer<typeof schema>;

export default function Form() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: FormData) => {
    const finalData = { ...data, date: new Date().toISOString() };

    const storedBlogs = localStorage.getItem("blogs");
    const blogs = storedBlogs ? JSON.parse(storedBlogs) : [];

    blogs.push(finalData);

    localStorage.setItem("blogs", JSON.stringify(blogs));

    reset({ username: "", title: "", blog: "" });
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center px-4">
      <h1 className="text-4xl font-bold text-blue-400 mb-2">My Awesome Blog</h1>
      <p className="text-gray-400 mb-8">
        Create, share, and discover amazing content.
      </p>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-lg space-y-6"
      >
        {/* Username */}
        <div>
          <label className="block text-gray-300 mb-1">Username</label>
          <input
            {...register("username")}
            placeholder="Enter username"
            className="w-full p-3 rounded bg-gray-700 text-white border border-gray-600 focus:border-blue-500"
          />
          {errors.username && (
            <p className="text-red-500 text-sm mt-1">
              {errors.username.message}
            </p>
          )}
        </div>

        {/* Title */}
        <div>
          <label className="block text-gray-300 mb-1">Title</label>
          <input
            {...register("title")}
            placeholder="Enter blog title"
            className="w-full p-3 rounded bg-gray-700 text-white border border-gray-600 focus:border-blue-500"
          />
          {errors.title && (
            <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
          )}
        </div>

        {/* Blog */}
        <div>
          <label className="block text-gray-300 mb-1">Blog</label>
          <textarea
            {...register("blog")}
            placeholder="Write your blog..."
            rows={5}
            className="w-full p-3 rounded bg-gray-700 text-white border border-gray-600 focus:border-blue-500"
          />
          {errors.blog && (
            <p className="text-red-500 text-sm mt-1">{errors.blog.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 p-3 rounded text-white font-semibold shadow-md"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
