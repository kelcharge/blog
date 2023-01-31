import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import { db } from "~/utils/db.server";

export const loader = async ({ params }: LoaderArgs) => {
  const post = await db.blogPost.findUnique({
    where: { id: Number(params.blogId) },
  });
  if (!post) {
    throw new Error("Joke not found");
  }
  return json({ post });
};

export default function BlogRoute() {
  const data = useLoaderData<typeof loader>();

  return (
    <div className="pt-2 flex flex-col items-center bg-zinc-300 text-black font-semibold shadow-md">
      <h2 className="text-2xl">{data.post.title}</h2>
      <span>By: {data.post.author}</span>
      <p className="p-4 w-3/4">{data.post.body}</p>
    </div>
  );
}
