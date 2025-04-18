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
import { createTopic } from "@/actions/create-topic";
import { useActionState } from "react";

const TopicsCreateForm = () => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [formData, action] = useActionState(createTopic, {
    errors: {},
    slug: undefined,
  });

  useEffect(() => {
    if (formData?.slug) {
      setOpen(false); // Close dialog
      console.log(formData.slug);
      router.push(`/topics/${formData.slug}`); // Navigate to topic page
    }
  }, [formData, router]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>New Topic</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form action={action}>
          <DialogHeader>
            <DialogTitle>Create A Topic</DialogTitle>
            <DialogDescription>
              Write A New Topic For Discussion
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div>
              <Label htmlFor="name" className="mb-2">Name</Label>
              <Input id="name" name="name" />
              {formData.errors.name && (
                <p className="text-sm text-red-500">
                  {formData.errors.name[0]}
                </p>
              )}
            </div>
            <div>
              <Label htmlFor="description" className="mb-2">Description</Label>
              <Textarea id="description" name="description" />
              {formData.errors.description && (
                <p className="text-sm text-red-500">
                  {formData.errors.description[0]}
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

export default TopicsCreateForm;
