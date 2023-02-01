import { json, ActionArgs } from "@remix-run/node";
import { useLoaderData, Outlet, Link, useMatches } from "@remix-run/react";
import PostBody from "~/components/PostBody";
import { useUser } from "~/root";
import { deletePost } from "~/services/ActionService";

import { db } from "~/utils/db.server";

export const action = async ({ request }: ActionArgs) => {
  return deletePost(request);
};

export const loader = async () => {
  return json({
    posts: await db.blogPost.findMany(),
  });
};

const Blog = () => {
  const data = useLoaderData<typeof loader>();
  const matches = useMatches();
  const route = matches[matches.length - 1];
  const latestPost = data.posts.filter(
    (post) => post.id === Math.max(...data.posts.map((post) => post.id))
  )[0];
  const user = useUser();

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
            {user && (
              <li className="bg-sky-700 rounded w-20 h-10 flex justify-center items-center mt-4 hover:bg-sky-500">
                <Link to="/blog/new">New Post</Link>
              </li>
            )}
          </ul>
        </div>
        <div className="min-w-[1024px] max-w-screen-lg">
          <h1 className="text-3xl pb-2 text-center">Posts</h1>
          {route.id === "routes/blog" && latestPost && (
            <PostBody post={latestPost} />
          )}
          <Outlet context={user} />
        </div>
      </div>
    </main>
  );
};

export default Blog;
