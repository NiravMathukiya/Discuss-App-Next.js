// No "use client" here – this is a Server Component
import { PostWithData } from "@/lib/query/post";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";
import Image from "next/image";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";

type PostListProps = {
  fetchData: () => Promise<PostWithData[]>;
};

const PostList = async ({ fetchData }: PostListProps) => {
  const posts = await fetchData();
  console.log(posts);

  return (
    <div className="flex flex-col gap-2 mt-4">
      {posts.map((post, index) => (
        <Card key={index}>
          <CardHeader>
            <CardTitle>{post.title}</CardTitle>
            <CardDescription className="flex items-center justify-between">
              <h1>{post.user?.name ?? "Unknown"}</h1>
              <Avatar>
                <AvatarImage src={post.user?.image ?? ""} />
                <AvatarFallback>{post.user?.name?.[0] ?? "?"}</AvatarFallback>
              </Avatar>
            </CardDescription>
              <h1>{post._count.comments} comments</h1>
          </CardHeader>
        </Card>
      ))}
    </div>
  );
};

export default PostList;
