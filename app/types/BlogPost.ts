import { BlogPost } from "@prisma/client";

type Post = Omit<BlogPost, 'createdAt' | 'lastModified'> & {
    createdAt: Date | string;
    lastModified: Date | string;
};


export default Post;