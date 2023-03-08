/*** System ***/
import { LoaderArgs, redirect, ActionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { TypedResponse } from "@remix-run/node";

/*** Hooks ***/
import { useLoaderData } from "@remix-run/react";

/*** Services ***/
import { deletePost } from "~/services/ActionService";
import { getPostDateTime } from "~/services/TimeService";

/*** Components ***/
import PostBody from "~/components/PostBody";

/*** Utils ***/
import { db } from "~/utils/db.server";
import { BlogPost } from "@prisma/client";

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

export const loader = async ({
  params,
}: LoaderArgs): Promise<
  TypedResponse<{ post: BlogPost; date: string; time: string }>
> => {
  const post = await db.blogPost.findUnique({
    where: { id: Number(params.blogId) },
  });
  if (!post) {
    return redirect("/blog");
  }

  const { date, time } = getPostDateTime(post);
  return json({ post, date, time });
};

export default function BlogRoute() {
  const data = useLoaderData<typeof loader>();

  return <PostBody post={data.post} date={data.date} time={data.time} />;
}
