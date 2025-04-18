import prisma from "@/lib";
import { notFound } from "next/navigation";
import React from "react";

type PostDetailProps = {
  postId: string;
};

const PostDetail: React.FC<PostDetailProps> = async ({ postId }) => {
  const post = await prisma.post.findFirst({
    where: {
      id: postId,
    },
  });

  if (!post) notFound();

  return <div className="flex flex-col gap-2">
    <h1 className="text-2xl font-bold my-2">{post.title}</h1>
    <p className="border rounded p-2">{post.content}</p>
  </div>;
};

export default PostDetail;
