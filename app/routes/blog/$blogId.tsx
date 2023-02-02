/*** System ***/
import { LoaderArgs, redirect, ActionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

/*** Services ***/
import { deletePost } from "~/services/ActionService";

/*** Components ***/
import PostBody from "~/components/PostBody";

/*** Utils ***/
import { db } from "~/utils/db.server";

export const action = async ({ request }: ActionArgs) => {
  const form = await request.formData();
  const actionType = form.get("action");
  const id = form.get("id")?.toString();

  if (actionType === "edit") {
    return redirect(`/blog/edit/${id}`);
  }

  if (actionType === "delete" && typeof id !== "undefined") {
    return deletePost(id);
  }
};

export const loader = async ({ params }: LoaderArgs) => {
  const post = await db.blogPost.findUnique({
    where: { id: Number(params.blogId) },
  });
  if (!post) {
    return redirect("/blog");
  }
  return json({ post });
};

export default function BlogRoute() {
  const data = useLoaderData<typeof loader>();

  return <PostBody post={data.post} />;
}
