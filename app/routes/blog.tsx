/*** System ***/
import { json, ActionArgs, redirect } from "@remix-run/node";
import { Outlet, useLoaderData, useLocation } from "@remix-run/react";

/*** Components ***/
import PostBody from "~/components/PostBody";
import PostMenu from "~/components/PostMenu";
import Container from "~/components/Container";

/*** Services ***/
import { deletePost } from "~/services/ActionService";
import { getPostDateTime } from "~/services/TimeService";

/*** Utils ***/
import { db } from "~/utils/db.server";
import { useUser } from "~/root";
import { Typography } from "@mui/material";

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
  const posts = await db.blogPost.findMany({
    take: 10,
    orderBy: {
      createdAt: "desc",
    },
  });

  const latestPost = posts.filter(
    (post) => post.id === Math.max(...posts.map((post) => post.id))
  )[0];

  const { date, time } = getPostDateTime(latestPost);

  return json({ posts, latestPost, date, time });
};

const Blog = () => {
  const data = useLoaderData<typeof loader>();
  const user = useUser();
  const location = useLocation();

  return (
    <Container title="Most Recent Posts">
      <PostMenu data={data} />
      {location.pathname === "/blog" && data.latestPost && (
        <PostBody post={data.latestPost} date={data.date} time={data.time} />
      )}
      <Outlet context={user} />
    </Container>
  );
};

export const ErrorBoundary = ({ error }: { error: any }) => {
  return (
    <Container title="Oops!">
      <Typography variant="caption">
        Something went wrong. Please try again later.
      </Typography>
    </Container>
  );
};

export default Blog;
