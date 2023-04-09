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
    <div className="flex flex-col lg:text-base max-h-12 lg:max-h-0">
      <div className="px-6 pt-2 lg:mb-0 flex flex-col items-center lg:text-left lg:mt-[5.2rem]">
        <ul className="text-left flex lg:flex-col gap-8 w-[100vw] ml-[5rem] overflow-x-scroll lg:w-full lg:ml-0 lg:overflow-x-auto">
          {data.posts.map((post: BlogPost) => (
            <li
              className="flex flex-col w-[100vw] lg:w-auto hover:cursor-pointer"
              key={post.id}
            >
              <Link
                className="w-[60vw] lg:w-auto hover:underline"
                to={`${prefix}${post.id}`}
              >
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
