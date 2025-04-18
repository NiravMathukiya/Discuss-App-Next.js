import PostList from "@/components/posts/PostList";
import TopicsCreateForm from "@/components/topics/TopicsCreateForm";
import { Button } from "@/components/ui/button";
import { FetchTopPosts } from "@/lib/query/post";

export default async function Home() {
  return (
    <div className="grid grid-cols-4 gap-4 p-4">
      <div className="col-span-3 ">
        <h1 className="text-xl">Top Post</h1>
        <PostList
          fetchData={async () => {
            return await FetchTopPosts();
          }}
        />
      </div>
      <div>
        <TopicsCreateForm />
      </div>
    </div>
  );
}
