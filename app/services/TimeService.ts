import BlogPost from "../types/BlogPost";

export const getPostDateTime = (post: BlogPost) => {
  const date = new Date(post?.createdAt).toLocaleDateString();
  const time = new Date(post?.createdAt).toLocaleTimeString();

  return { date, time };
};
