"use server";

import { auth } from "@/auth";
import prisma from "@/lib";
import { Post } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

const createPostSchema = z.object({
  title: z
    .string()
    .min(3, { message: "Title must be at least 3 characters long" }),
  content: z
    .string()
    .min(10, { message: "Content must be at least 10 characters long" }),
});

type CreatePostFormState = {
  errors: {
    title?: string[];
    content?: string[];
    formErrors?: string[];
  };
  postId?: string;
};


export const createPost = async (
  slug: string,
  prevState: CreatePostFormState,
  formDate: FormData
): Promise<CreatePostFormState> => {
  const result = createPostSchema.safeParse({
    title: formDate.get("title"),
    content: formDate.get("content"),
  });

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }

  const session = await auth();
  if (!session || !session.user || !session.user.id) {
    return {
      errors: {
        formErrors: ["You must be signed in to create a post"],
      },
    };
  }

  const topic = await prisma.topic.findFirst({
    where: {
      slug: slug,
    },
  });

  if (!topic) {
    return {
      errors: {
        formErrors: ["Topic does not exist"],
      },
    };
  }
  console.log(topic);

  try {
    const post = await prisma.post.create({
      data: {
        title: result.data.title,
        content: result.data.content,
        userId: session.user.id,
        topicId: topic.id,
      },
    });
    revalidatePath(`/topics/${slug}`);
    return {
      errors: {},
      postId: post.id,
    };

   
    // redirect(`/topics/${slug}/posts/${p.id}`);
  } catch (error: unknown) {
    if (error instanceof Error) {
      return {
        errors: {
          formErrors: [error.message],
        },
      };
    } else {
      return {
        errors: {
          formErrors: ["Something went wrong"],
        },
      };
    }
  }
};
