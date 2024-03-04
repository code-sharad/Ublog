import { Link } from "react-router-dom";
import { BlogCard } from "../componentss/BlogCard";
import { useBlogs } from "../hooks";

function Blogs() {
  const { loading, blogs } = useBlogs();
  console.log(loading);
  return (
    <div className="flex  justify-center flex-col lg:mx-20 md:mx-12 mx-2 cursor-pointer">
      {blogs.map((blog) => (
        <Link to={`/blog/${blog.id}`}>
          <BlogCard
            key={blog.id}
            title={blog.title}
            content={blog.content}
            authorName={blog.User.username || "Anonymous"}
            publishedDate={blog.publishedDate || ""}
          />
        </Link>
      ))}
    </div>
  );
}

export default Blogs;
