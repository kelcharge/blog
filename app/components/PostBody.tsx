import { useUser } from "~/root";
import { marked } from "marked";
import Post from "~/types/BlogPost";

const PostBody = ({ post, date }: { post: Post; date: string }) => {
  const user = useUser();
  const markdown = marked.parse(post.body);
  const actionStyles =
    "absolute top-1 font-bold px-2 bg-red-600 text-center hover:bg-red-400 hover:cursor-pointer";

  return (
    <div className="w-full px-4 lg:px-0">
      <div className="pt-2 flex flex-col items-center text-gray-800 relative">
        {user && (
          <>
            <form method="post">
              <input type="hidden" name="id" value={post.id} />
              <input type="hidden" name="action" value="edit" />
              <button className={`left-4 ${actionStyles}`}>Edit</button>
            </form>
            <form method="post">
              <input type="hidden" name="id" value={post.id} />
              <input type="hidden" name="action" value="delete" />
              <button className={`right-4 ${actionStyles}`}>X</button>
            </form>
          </>
        )}
        <h2 className="text-2xl lg:text-4xl">{post.title}</h2>
        <span className="text-sm lg:text-lg font-thin">
          By {post.author} | {date}
        </span>

        <div
          className="pt-4 pb-8 mx-auto flex flex-col w-[90vw] lg:w-5/6 text-center lg:text-left lg:text-xl font-thin"
          dangerouslySetInnerHTML={{ __html: markdown }}
        />
      </div>
    </div>
  );
};

export default PostBody;
