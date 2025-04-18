import PostCreateForm from "@/components/posts/PostCreateForm";
import PostList from "@/components/posts/PostList";
import { FetchPostsBySlug } from "@/lib/query/post";
import React from "react";

type TopicShowPageProps = {
  params: Promise<{ slug: string }>;
};

const topicDetail: React.FC<TopicShowPageProps> = async ({ params }) => {
  return (
    <div className="grid grid-cols-4 gap-4 p-4">
      <div className="  col-span-3">
        <h1 className="text-xl font-bold capitalize">{(await params).slug}</h1>
      <PostList fetchData={async () => { return FetchPostsBySlug((await params).slug); }}/>
      </div>
      <div className="">
        <PostCreateForm slug={(await params).slug} />
      </div>
    </div>
  );
};

export default topicDetail;
