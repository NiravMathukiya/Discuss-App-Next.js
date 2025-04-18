import React from "react";
import CommentShow from "./CommentShow";
import { FetchCommentsByPostId } from "@/lib/query/comment";

type CommentListProps = {
  postId: string;
};

const CommentList: React.FC<CommentListProps> = async ({ postId }) => {
  const comments = await FetchCommentsByPostId(postId);

  const singleComment = comments.filter((c) => {
    return c.parentId === null;
  });
  return (
    <div>
      <h1 className="font-bold text-lg">All 0 Comments</h1>
      {singleComment.map((comment, index) => (
        <CommentShow
          key={index}
          postId={comment.postId}
          commentId={comment.id}
        />
      ))}
    </div>
  );
};

export default CommentList;
