"use client";

import React, { useActionState } from "react";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { createComment } from "@/actions/create-commet";
import { Loader2 } from "lucide-react";

type CreateCommentFormProps = {
  postId: string;
  parentId?: string;
  startOpen: boolean;
};

const CreateCommentForm: React.FC<CreateCommentFormProps> = ({
  postId,
  parentId,
  startOpen,
}) => {
  const [open, setOpen] = React.useState(startOpen);
  const [formData, action, isPending] = useActionState(
    createComment.bind(null, { postId, parentId }),
    { errors: {} }
  );

  return (
    <div>
      <Button
        onClick={() => setOpen(!open)}
        variant={"secondary"}
        size={"sm"}
        className="mb-2"
      >
        Replay
      </Button>
      {open && (
        <form action={action} className="space-y-2">
          <Textarea
            name="content"
            className="bg-gray-100 focus-visible:ring-0"
            placeholder="Write a comment..."
          />
          {formData.errors.content && (
            <p className="text-sm text-red-500">{formData.errors.content[0]}</p>
          )}
          {formData.errors.formErrors && (
            <div className="text-sm p-2 rounded-md bg-red-200 border-red-600 ">
              {formData.errors.formErrors[0]}
            </div>
          )}
          <Button disabled={isPending} className="w-full" variant={"default"} size={"sm"}>
            {isPending ? (
              <>
                <Loader2 />
                Please wait ...
              </>
            ) : (
              "Save"
            )}
          </Button>
        </form>
      )}
    </div>
  );
};

export default CreateCommentForm;
