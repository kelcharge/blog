import { db } from "~/utils/db.server";
import { json } from "@remix-run/node";
import { useLoaderData } from "react-router";
import PostList from "~/components/PostList";

export const loader = async () => {
  return json({
    posts: await db.blogPost.findMany({
      take: 10,
      orderBy: {
        createdAt: "desc",
      },
    }),
  });
};

export default function Index() {
  const data = useLoaderData<typeof loader>();

  return (
    <div className="h-screen text-white bg-slate-700 flex">
      <div className="flex flex-row justify-center">
        <div className="px-6 pt-10">
          <ul>
            <PostList posts={data.posts} />
          </ul>
        </div>
      </div>
      <div className="flex grow justify-center">
        <h2 className="font-extrabold text-5xl">Welcome!</h2>
      </div>
    </div>
  );
}
