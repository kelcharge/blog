import { useUser } from "~/root";

const PostBody = ({ post }: { post: any }) => {
  const user = useUser();

  return (
    <div className="pt-2 flex flex-col items-center bg-zinc-300 text-black font-semibold shadow-md relative">
      {user && (
        <form method="post">
          <input type="hidden" name="id" value={post.id} />
          <button className="absolute top-1 right-4 font-bold px-2 bg-red-600 text-white text-center hover:bg-red-400 hover:cursor-pointer">
            X
          </button>
        </form>
      )}
      <h2 className="text-2xl">{post.title}</h2>
      <span>Author: {post.author}</span>
      <p className="p-4 w-3/4">{post.body}</p>
    </div>
  );
};

export default PostBody;
