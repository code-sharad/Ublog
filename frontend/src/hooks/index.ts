import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../config";

interface Blog {
  title: string;
  content: string;
  id: string;
  publishedDate:string,
  User: {
    username: string;
  };
}




export const useBlogs = () => {
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    axios
      .get(`${BASE_URL}/blog/bluk`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setBlogs(res.data.blog);
        setLoading(false);
      });
  }, []);

  return {
    loading,
    blogs,
  };
};


