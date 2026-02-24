import Link from "next/link";
import { BASE_API_URL } from "../page";
import type { BlogPostProps as Post } from "../page";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";

interface BlogPostPageProps {
  params: Promise<{ id: string }>;
}

async function fetchPost(id: string): Promise<Post> {
  const res = await fetch(`${BASE_API_URL}/posts/${id}`);

  if (!res.ok) {
    throw new Error("Failed to fetch post");
  }

  return res.json();
}

export default async function Page({ params }: BlogPostPageProps) {
  const { id } = await params; // ✅ unwrap in Next 15
  const post = await fetchPost(id);

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <Card className="w-full max-w-2xl shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl">{post.title}</CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          <p className="text-muted-foreground leading-relaxed">
            {post.body}
          </p>

          <div>
            <Link href="/blog">
              <Button variant="outline">Back to Blog</Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}