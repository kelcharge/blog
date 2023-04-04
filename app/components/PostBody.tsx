import { useUser } from "~/root";
import { marked } from "marked";
import Post from "~/types/BlogPost";

const PostBody = ({ post, date }: { post: Post; date: string }) => {
  const user = useUser();
  const markdown = marked.parse(post.body);
  const actionStyles =
    "absolute top-1 font-bold px-2 bg-red-600 text-center hover:bg-red-400 hover:cursor-pointer";

  return (
    <div>
      <div className="pt-2 flex flex-col items-center text-black relative">
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
        <h2 className="text-2xl">{post.title}</h2>
        <span className="text-sm">
          By {post.author} | {date}
        </span>

        <div
          className="pt-4 px-4 pb-8 lg:w-5/6 text-center lg:text-left"
          dangerouslySetInnerHTML={{ __html: markdown }}
        />
      </div>
    </div>
  );
};

export default PostBody;
