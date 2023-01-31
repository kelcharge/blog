import type { ActionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";

import { db } from "~/utils/db.server";

export const action = async ({ request }: ActionArgs) => {
  const form = await request.formData();
  const author = form.get("author");
  const title = form.get("title");
  const body = form.get("body");
  // we do this type check to be extra sure and to make TypeScript happy
  // we'll explore validation next!
  if (
    typeof author !== "string" ||
    typeof title !== "string" ||
    typeof body !== "string"
  ) {
    throw new Error(`Form not submitted correctly.`);
  }

  const fields = { author, title, body };

  const post = await db.blogPost.create({ data: fields });
  return redirect(`/blog/${post.id}`);
};

export default function NewPostRoute() {
  return (
    <div className="p-6 flex flex-col gap-4 items-center">
      <h3 className="text-2xl">Add a post</h3>
      <form method="post" className="flex flex-col gap-4 items-center">
        <div className="flex flex-row gap-2 justify-left items-center">
          <label>Author:</label>
          <input type="text" name="author" />
        </div>
        <div className="flex flex-row gap-2 justify-left items-center">
          <label>Title:</label>
          <input name="title" type="text" />
        </div>
        <div className="flex flex-row gap-2 justify-left items-center">
          <label>Body:</label>
          <textarea name="body" />
        </div>
        <div>
          <button
            type="submit"
            className="bg-gray-900 rounded w-20 h-8 hover:bg-gray-800"
          >
            Add
          </button>
        </div>
      </form>
    </div>
  );
}
