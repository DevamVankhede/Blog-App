// src/features/blogs/Form.tsx
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { useBlogStore } from "../../store/blogContext"; // ✅ centralized state
import { createBlog } from "../../services/blogServices"; // ✅ API layer

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
  const navigate = useNavigate();
  const { addBlog } = useBlogStore(); // ✅ global state management
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    const finalData = {
      ...data,
      id: Date.now().toString(),
      date: new Date().toISOString(),
    };

    try {
      // ✅ Update local/global state
      addBlog(finalData);

      // ✅ API call separated
      await createBlog(finalData);

      navigate("/card");
      reset({ username: "", title: "", blog: "" });
    } catch (err) {
      alert("⚠️ Failed to save blog. Please try again later.");
      console.error("Error saving blog:", err);
    }
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
        <FormField
          label="Username"
          type="text"
          placeholder="Enter username"
          register={register("username")}
          error={errors.username?.message}
        />

        {/* Title */}
        <FormField
          label="Title"
          type="text"
          placeholder="Enter blog title"
          register={register("title")}
          error={errors.title?.message}
        />

        {/* Blog */}
        <FormField
          label="Blog"
          type="textarea"
          placeholder="Write your blog..."
          register={register("blog")}
          error={errors.blog?.message}
        />

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-500 hover:bg-blue-600 p-3 rounded text-white font-semibold shadow-md disabled:opacity-50"
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
}

/* ✅ Small reusable field component */
function FormField({
  label,
  type,
  placeholder,
  register,
  error,
}: {
  label: string;
  type: "text" | "textarea";
  placeholder: string;
  register: any;
  error?: string;
}) {
  return (
    <div>
      <label className="block text-gray-300 mb-1">{label}</label>
      {type === "textarea" ? (
        <textarea
          {...register}
          placeholder={placeholder}
          rows={5}
          className="w-full p-3 rounded bg-gray-700 text-white border border-gray-600 focus:border-blue-500"
        />
      ) : (
        <input
          {...register}
          placeholder={placeholder}
          className="w-full p-3 rounded bg-gray-700 text-white border border-gray-600 focus:border-blue-500"
        />
      )}
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}
