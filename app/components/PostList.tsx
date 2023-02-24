import { Link } from "@remix-run/react";
import { BlogPost } from "@prisma/client";

const PostList = (data: Record<string, any>) => {
  return (
    <>
      {data.posts.map((post: BlogPost) => (
        <li className="flex hover:underline" key={post.id}>
          <Link to={`${post.id}`}>{post.title}</Link>
        </li>
      ))}
    </>
  );
};

export default PostList;
