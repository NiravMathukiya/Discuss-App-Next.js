"use server";

import * as auth from "@/auth";

export const signOut = async () => {
  return await auth.signOut();
};
