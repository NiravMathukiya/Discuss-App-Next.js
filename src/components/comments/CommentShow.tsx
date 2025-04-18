import { FetchCommentsByPostId } from "@/lib/query/comment";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import CreateCommentForm from "./CreateCommentForm";

type CommentShowProps = {
  postId: string;
  commentId: string;
};

const CommentShow: React.FC<CommentShowProps> = async ({
  postId,
  commentId,
}) => {
  const comments = await FetchCommentsByPostId(postId);

  const comment = comments.find((c) => {
    return c.id === commentId;
  });

  if (!comment) return null;

  const children = comments.filter((c) => {
    return c.parentId === commentId;
  });

  return (
    <div className="m-4 p-4 border">
      <div className="flex gap-3 ">
        <Avatar>
          <AvatarImage src={comment.user.image || ""}></AvatarImage>
          <AvatarFallback>NM</AvatarFallback>
        </Avatar>
        <div className="flex-1 space-y-3">
          <p className="text-gray-500 text-sm font-medium">
            {comment.user.name}
          </p>
          <p className="text-gray-800 ">{comment.content}</p>
          <CreateCommentForm
            postId={comment.postId}
            parentId={comment.id}
            startOpen={false}
          />
        </div>
      </div>
      {children.map((c) => {
        return <CommentShow key={c.id} postId={c.postId} commentId={c.id} />;
      })}
    </div>
  );
};

export default CommentShow;
