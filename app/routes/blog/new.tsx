import type { ActionArgs } from "@remix-run/node";
import { createPost } from "~/services/ActionService";

export const action = async ({ request }: ActionArgs) => {
  return createPost(request);
};

export default function NewPostRoute() {
  return (
    <div className="p-6 flex flex-col gap-4 items-center">
      <h3 className="text-2xl">Add a post</h3>
      <form method="post" className="flex flex-col gap-4 items-center">
        <div className="flex flex-row gap-2 justify-left items-center">
          <label>Author:</label>
          <input type="text" name="author" />
        </div>
        <div className="flex flex-row gap-2 justify-left items-center">
          <label>Title:</label>
          <input name="title" type="text" />
        </div>
        <div className="flex flex-row gap-2 justify-left items-center">
          <label>Body:</label>
          <textarea name="body" />
        </div>
        <div>
          <button
            type="submit"
            className="bg-gray-900 rounded w-20 h-8 hover:bg-gray-800"
          >
            Add
          </button>
        </div>
      </form>
    </div>
  );
}
