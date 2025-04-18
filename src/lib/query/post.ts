import prisma from "@/lib";
import { Post } from "@prisma/client";

export type PostWithData = Post & {
  user?: {
    name: string | null;
    image: string | null;
  };
  topic?: {
    slug: string;
  };
  _count: {
    comments: number;
  };
};

export const FetchPostsBySlug = async (
  slug: string
): Promise<PostWithData[]> => {
  try {
    const data = await prisma.post.findMany({
      where: {
        topic: {
          is: {
            slug: slug,
          },
        },
      },
      include: {
        topic: { select: { slug: true } },
        _count: { select: { comments: true } },
        user: { select: { name: true, image: true } },
      },
    });
    return data;
  } catch (error) {
    console.error("❌ Error in FetchPostsBySlug:", error);
    throw error;
  }
};

export const FetchTopPosts = async (): Promise<PostWithData[]> => {
  try {
    return await prisma.post.findMany({
      orderBy: {
        comments: {
          _count: "desc",
        },
      },
      include: {
        topic: { select: { slug: true } },
        _count: { select: { comments: true } },
        user: { select: { name: true, image: true } },
      },
    });
  } catch (error) {
    console.error("❌ Error in FetchTopPosts:", error);
    throw error;
  }
};

export const FetchPostBySearch = async (
  term: string
): Promise<PostWithData[]> => {
  try {
    return await prisma.post.findMany({
      where: {
        OR: [
          {
            title: {
              contains: term,
            },
          },
          {
            content: {
              contains: term,
            },
          },
        ],
      },
      include: {
        topic: { select: { slug: true } },
        _count: { select: { comments: true } },
        user: { select: { name: true, image: true } },
      },
    });
  } catch (error) {
    console.error("❌ Error in FetchPostBySearch:", error);
    throw error;
  }
};
