import { Link } from "@remix-run/react";
import { BlogPost } from "@prisma/client";
import useRouteId from "~/hooks/useRouteId";
import { useUser } from "~/root";
import { getPostDateTime } from "~/services/TimeService";

const PostMenu = ({ data }: any) => {
  const routes = useRouteId();
  const prefix = routes.includes("routes/blog") ? "" : "blog/";
  const user = useUser();

  return (
    <div className="flex flex-col">
      <div className="px-6 pt-2 mb-8 lg:mb-0 flex flex-col items-center lg:text-left mt-[4.2rem]">
        <ul className="text-left list-disc list-inside">
          {data.posts.map((post: BlogPost) => (
            <li className="flex flex-col hover:cursor-pointer" key={post.id}>
              <Link className="hover:underline" to={`${prefix}${post.id}`}>
                {post.title}
              </Link>
              <span className="text-gray-400">
                {getPostDateTime(post).date}
              </span>
            </li>
          ))}
          {user && (
            <li className="bg-sky-700 rounded w-20 h-10 flex items-center text-center mt-4 hover:bg-sky-500">
              <Link to="/blog/new">New Post</Link>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default PostMenu;
