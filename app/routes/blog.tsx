/*** System ***/
import { json, ActionArgs, redirect } from "@remix-run/node";
import { Outlet, useLoaderData, useLocation } from "@remix-run/react";

/*** Components ***/
import PostBody from "~/components/PostBody";
import PostMenu from "~/components/PostMenu";
import Container from "~/components/Container";

/*** Services ***/
import { deletePost } from "~/services/ActionService";

/*** Utils ***/
import { db } from "~/utils/db.server";
import { useUser } from "~/root";

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

const Blog = () => {
  const data = useLoaderData<typeof loader>();
  const latestPost = data.posts.filter(
    (post) => post.id === Math.max(...data.posts.map((post) => post.id))
  )[0];
  const user = useUser();
  const location = useLocation();

  return (
    <Container title="Most Recent Posts">
      <PostMenu data={data} />
      {location.pathname === "/blog" && latestPost && (
        <PostBody post={latestPost} />
      )}
      <Outlet context={user} />
    </Container>
  );
};

export const ErrorBoundary = ({ error }: { error: any }) => {
  console.log(error);
  return <h1>Oops! Something went wrong!</h1>;
};

export default Blog;
