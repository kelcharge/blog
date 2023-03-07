import { Link } from "@remix-run/react";
import { BlogPost } from "@prisma/client";
import useRouteId from "~/hooks/useRouteId";
import { useUser } from "~/root";

const PostMenu = ({ data }: any) => {
  const routes = useRouteId();
  const prefix = routes.includes("routes/blog") ? "" : "blog/";
  const user = useUser();

  return (
    <div className="px-6 pt-10">
      <ul>
        {data.posts.map((post: BlogPost) => (
          <li className="flex hover:underline" key={post.id}>
            <Link to={`${prefix}${post.id}`}>{post.title}</Link>
          </li>
        ))}
        {user && (
          <li className="bg-sky-700 rounded w-20 h-10 flex items-center text-center mt-4 hover:bg-sky-500">
            <Link to="/blog/new">New Post</Link>
          </li>
        )}
      </ul>
    </div>
  );
};

export default PostMenu;
