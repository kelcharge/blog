import { db } from "~/utils/db.server";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import PostBody from "~/components/PostBody";
import Container from "~/components/Container";
import PostMenu from "~/components/PostMenu";
import { getPostDateTime } from "~/services/TimeService";

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

export default function Index() {
  const data = useLoaderData<typeof loader>();

  return (
    <Container>
      <PostMenu data={data} />
      {data.latestPost && <PostBody post={data.latestPost} date={data.date} />}
    </Container>
  );
}
