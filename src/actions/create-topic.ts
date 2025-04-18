"use server";

import { auth } from "@/auth";
import prisma from "@/lib";
import { revalidatePath } from "next/cache";

import { z } from "zod";

const CreateTopicSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Name must be at least 3 characters long" })
    .regex(/^[a-zA-Z0-9-]+$/, {
      message: "Name can only contain letters and hyphens",
    }),
  description: z
    .string()
    .min(10, { message: "Description must be at least 10 characters long" }),
});

type CreateTopicFormState = {
  errors: {
    name?: string[];
    description?: string[];
    formErrors?: string[];
  };
};

export const createTopic = async (
  prevState: CreateTopicFormState,
  formData: FormData
): Promise<CreateTopicFormState & { slug?: string }> => {
  const name = formData.get("name");
  const description = formData.get("description");

  const result = CreateTopicSchema.safeParse({
    name,
    description,
  });

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }

  const session = await auth();

  if (!session || !session.user) {
    return {
      errors: {
        formErrors: ["You must be signed in to create a topic"],
      },
    };
  }

  try {
    const topic = await prisma.topic.create({
      data: {
        slug: result.data.name,
        description: result.data.description,
      },
    });

    revalidatePath("/");
    return {
      errors: {},
      slug: topic.slug, // send back slug for client-side redirect
    };
  } catch (error) {
    return {
      errors: {
        formErrors: [error instanceof Error ? error.message : "Something went wrong"],
      },
    };
  }
};
