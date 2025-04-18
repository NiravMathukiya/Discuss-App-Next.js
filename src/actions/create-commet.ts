"use server";
import { auth } from "@/auth";
import prisma from "@/lib";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const CreateCommentSchema = z.object({
  content: z
    .string()
    .min(3, { message: "Content must be at least 10 characters long" }),
});

type CreateCommentFormState = {
  errors: {
    content?: string[];
    formErrors?: string[];
  };
};

export const createComment = async (
  { postId, parentId }: { postId: string; parentId?: string  },
  prevState: CreateCommentFormState,
  formData: FormData
): Promise<CreateCommentFormState> => {
  const result = CreateCommentSchema.safeParse({
    content: formData.get("content"),
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
        formErrors: ["You must be signed in to create a comment"],
      },
    };
  }

  try {
    await prisma.comment.create({
      data: {
        content: result.data.content,
        userId: session.user.id,
        parentId: parentId,
        postId: postId,
      },
    });
    const topic = await prisma.topic.findFirst({
      where: {
        posts: {
          some: {
            id: postId,
          },
        },
      },
    });
    if (!topic) {
      return {
        errors: {
          formErrors: ["Topic does not exist"],
        },
      };
    }

    revalidatePath(`/topics/${topic?.slug}/posts/${postId}`);

    return {
      errors: {},
    };
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
