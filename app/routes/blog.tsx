import { json } from "@remix-run/node";
import { useLoaderData, Outlet, Link } from "@remix-run/react";

import { db } from "~/utils/db.server";

export const loader = async () => {
  return json({
    posts: await db.blogPost.findMany(),
  });
};

const Blog = () => {
  const data = useLoaderData<typeof loader>();

  return (
    <main className="h-screen text-white bg-slate-700 flex flex-col items-center">
      <div className="flex flex-row justify-center w-full">
        <div className="px-6 pt-10">
          <ul>
            {data.posts.map((post) => (
              <li className="hover:underline" key={post.id}>
                <Link to={`${post.id}`}>{post.title}</Link>
              </li>
            ))}
            <li className="bg-sky-700 rounded w-20 h-10 flex justify-center items-center mt-4 hover:bg-sky-500">
              <Link to="/blog/new">New Post</Link>
            </li>
          </ul>
        </div>
        <div className="min-w-[1024px] max-w-screen-lg">
          <h1 className="text-3xl pb-2 text-center">Posts</h1>
          <Outlet />
        </div>
      </div>
    </main>
  );
};

export default Blog;
