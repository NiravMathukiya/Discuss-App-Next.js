import prisma from "@/lib";
import { Comment } from "@prisma/client";
import { cache } from "react";

type CommentWithAuthor = Comment & {
  user: {
    name: string | null;
    image: string | null;
  };
};

export const FetchCommentsByPostId = cache(
  (postId: string): Promise<CommentWithAuthor[]> => {
    try {
      return prisma.comment.findMany({
        where: {
          postId: postId,
        },
        include: {
          user: {
            select: {
              name: true,
              image: true,
            },
          },
        },
      });
    } catch (error) {
      console.error("❌ Error in FetchCommentsByPostId:", error);
      throw error;
    }
  }
);
