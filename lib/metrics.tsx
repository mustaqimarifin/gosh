import { cache } from "react";
import { serverClient } from "./supabase/server";

export const getBlogViews = cache(async () => {
  const supabase = serverClient();
  const { data: total } = await supabase.from("pageviews").select("*");
  return total?.reduce((acc, row) => acc + row.view_count, 0);
});
