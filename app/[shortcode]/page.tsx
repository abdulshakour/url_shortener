import db from "@/lib/db";
import { redirect } from "next/navigation";

export default async function Redirect({
  params,
}: {
  params: { shortcode: string };
}) {
  const { shortcode } = params;

  const url = await db.url.findUnique({
    where: { shortCode: shortcode },
  });

  if (!url) {
    return <div>404 - Url not found{shortcode}</div>;
  }
  redirect(url.originalUrl);
}
