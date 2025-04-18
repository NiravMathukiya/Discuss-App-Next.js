import CommentList from "@/components/comments/commentList";
import CreateCommentForm from "@/components/comments/CreateCommentForm";
import PostDetail from "@/components/posts/PostDetail";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import React from "react";

type PostDetailPageProps = {
  params: Promise<{ slug: string; postId: string }>;
};

const PostDetailPage: React.FC<PostDetailPageProps> = async ({ params }) => {
  const { slug, postId } = await params;
  return (
    <div className="space-y-3">
      <Link
        href={`/topics/${slug}`}
        className="text-xl font-bold flex items-center"
      >
        <Button className="mr-2" variant={"link"}>
          <ChevronLeft /> Back to {slug}
        </Button>
      </Link>
      <PostDetail postId={postId} />
      <CreateCommentForm postId={postId} startOpen></CreateCommentForm>
      <CommentList  postId={postId} />

    </div>
  );
};

export default PostDetailPage;
