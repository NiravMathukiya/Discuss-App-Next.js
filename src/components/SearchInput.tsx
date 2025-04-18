"use client";

import React from "react";
import { Input } from "./ui/input";
import { useSearchParams } from "next/navigation";
import { search } from "@/actions/search";

const SearchInput = () => {
  const searchParams = useSearchParams();
  const defaultValue = searchParams.get("term") || "";

  return (
    <div>
      <form action={search}>
        <Input
          defaultValue={defaultValue}
          type="text"
          name="term"
          placeholder="Search post ..."
        />
      </form>
    </div>
  );
};

export default SearchInput;
