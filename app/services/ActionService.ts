import { redirect } from "@remix-run/node";

import { db } from "~/utils/db.server";

export const deletePost = async (id: string) => {
  const success = await db.blogPost.delete({
    where: { id: Number(id) },
  });

  if (!success) {
    return;
  }

  return redirect("/blog");
}

export const updatePost = async (id: string, data: any) => {
  const author = data.get("author");
  const title = data.get("title");
  const body = data.get("body");

  const success = await db.blogPost.update({
    where: { id: Number(id) },
    data: { author, title, body }
  });

  if (!success) {
    return;
  }

  return redirect(`/blog/${id}`);
}

export const createPost = async (request: Request) => {
  const form = await request.formData();
  const author = form.get("author");
  const title = form.get("title");
  const body = form.get("body");

  if (
    typeof author !== "string" ||
    typeof title !== "string" ||
    typeof body !== "string"
  ) {
    throw new Error(`Form not submitted correctly.`);
  }

  const fields = { author, title, body };

  const post = await db.blogPost.create({ data: fields });

  if (!post) {
    return redirect("/blog");
  }

  return redirect(`/blog/${post.id}`);
}