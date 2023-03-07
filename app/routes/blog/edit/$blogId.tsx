import type { ActionArgs, LoaderArgs } from "@remix-run/node";
import { redirect, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { updatePost } from "~/services/ActionService";
import { db } from "~/utils/db.server";

export const action = async ({ request }: ActionArgs) => {
  const formData = await request.formData();
  const id = formData.get("id");

  if (id !== null && typeof id !== "undefined") {
    return updatePost(id.toString(), formData);
  }

  return null;
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

export default function EditPostRoute() {
  const data = useLoaderData<typeof loader>();

  return (
    <div className="min-w-[1024px] max-w-screen-lg p-6 flex flex-col gap-4 items-center">
      <h3 className="text-2xl">Edit post</h3>
      <form method="post" className="flex flex-col gap-4 items-center">
        <input type="hidden" name="id" value={data.post.id} />
        <div className="flex flex-row gap-2 justify-left items-center">
          <label>Author:</label>
          <input type="text" name="author" defaultValue={data.post?.author} />
        </div>
        <div className="flex flex-row gap-2 justify-left items-center">
          <label>Title:</label>
          <input name="title" type="text" defaultValue={data.post?.title} />
        </div>
        <div className="flex flex-row gap-2 justify-left items-center">
          <label>Body:</label>
          <textarea name="body" defaultValue={data.post?.body} />
        </div>
        <div>
          <button
            type="submit"
            className="bg-gray-900 rounded w-20 h-8 hover:bg-gray-800"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}
