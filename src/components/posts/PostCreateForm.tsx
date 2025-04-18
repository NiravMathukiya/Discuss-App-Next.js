"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "../ui/textarea";
import { useActionState } from "react";
import { createPost } from "@/actions/create-post";

type PostCreateFormProps = {
  slug : string;
};

const PostCreateForm: React.FC<PostCreateFormProps> = ({ slug }) => { 
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [formData, action] = useActionState(createPost.bind(null , slug), { errors: {}});

  useEffect(() => {
    if (formData?.postId) {
      setOpen(false);
      router.push(`/topics/${slug}/posts/${formData.postId}`);
    }
  }, [formData, router, slug]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>New Post</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form action={action}>
          <DialogHeader>
            <DialogTitle>Create A Post</DialogTitle>
            <DialogDescription>
              Write A New Post For Discussion
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div>
              <Label htmlFor="title" className="mb-2">Title</Label>
              <Input id="title" name="title" />
              {formData.errors.title && (
                <p className="text-sm text-red-500">
                  {formData.errors.title[0]}
                </p>
              )}
            </div>
            <div>
              <Label htmlFor="content" className="mb-2">content</Label>
              <Textarea id="content" name="content" /> 
              {formData.errors.content && (
                <p className="text-sm text-red-500">
                  {formData.errors.content[0]}
                </p>
              )}
            </div>
            {formData.errors.formErrors && (
              <p className="text-sm bg-red-300 p-2 text-center text-black rounded-lg">
                {formData.errors.formErrors[0]}
              </p>
            )}
          </div>
          <DialogFooter>
            <Button type="submit" className="w-full">
              Save changes
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default PostCreateForm;
