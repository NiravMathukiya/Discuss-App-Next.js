// app/search/page.tsx

import PostList from "@/components/posts/PostList";
import { FetchPostBySearch } from "@/lib/query/post";
import React from "react";

type SearchPageProps = {
  searchParams: { term?: string };
};

const SearchPage: React.FC<SearchPageProps> = async ({ searchParams }) => {
  const term = searchParams.term || "";

  return (
    <div>
      <h1 className="text-blue-600 font-md italic">Search Result For {term}</h1>
      <PostList
        fetchData={async () => {
          return await FetchPostBySearch(term);
        }}
      />
    </div>
  );
};

export default SearchPage;
