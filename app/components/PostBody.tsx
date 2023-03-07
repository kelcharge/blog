import { useUser } from "~/root";

const PostBody = ({ post }: any) => {
  const user = useUser();

  return (
    <div className="min-w-[1024px] max-w-screen-lg">
      <h1 className="text-3xl pb-2 text-center">Posts</h1>
      <div className="pt-2 flex flex-col items-center bg-zinc-300 text-black font-semibold shadow-md relative">
        {user && (
          <>
            <form method="post">
              <input type="hidden" name="id" value={post.id} />
              <input type="hidden" name="action" value="edit" />
              <button className="absolute top-1 left-4 font-bold px-2 bg-red-600 text-white text-center hover:bg-red-400 hover:cursor-pointer">
                Edit
              </button>
            </form>
            <form method="post">
              <input type="hidden" name="id" value={post.id} />
              <input type="hidden" name="action" value="delete" />
              <button className="absolute top-1 right-4 font-bold px-2 bg-red-600 text-white text-center hover:bg-red-400 hover:cursor-pointer">
                X
              </button>
            </form>
          </>
        )}
        <h2 className="text-2xl">{post.title}</h2>
        <span>Author: {post.author}</span>
        <p className="p-4 w-3/4">{post.body}</p>
      </div>
    </div>
  );
};

export default PostBody;
