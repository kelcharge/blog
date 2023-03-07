import { db } from "~/utils/db.server";
import { json } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";
import PostBody from "~/components/PostBody";
import Container from "~/components/Container";
import PostMenu from "~/components/PostMenu";

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
  const latestPost = data.posts.filter(
    (post) => post.id === Math.max(...data.posts.map((post) => post.id))
  )[0];

  return (
    <Container title="Welcome">
      <PostMenu data={data} />
      {latestPost && <PostBody post={latestPost} />}
    </Container>
  );
}
