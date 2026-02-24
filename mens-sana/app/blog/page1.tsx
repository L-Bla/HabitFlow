import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardAction } from '../components/ui/card';
import Link from "next/link";

export interface BlogPostProps{
  userId: number;
  id: number;
  title: string;
  body: string;
}

export const BASE_API_URL = "https://jsonplaceholder.typicode.com";

async function fetchPosts(): Promise<BlogPostProps[]>{
  const response = await fetch(`${BASE_API_URL}/posts`);
  return response.json();
}

export default async function Blog() {
  const blogPosts = await fetchPosts();

  return (
    <div className="space-y-6">
      <h1>Blog</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogPosts.map((post) => (
          <Link key={post.id} href={`/blog/${post.id}`}>
          <Card key={post.id} className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <CardTitle className="text-base">{post.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{post.body}</p>
            </CardContent>
          </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
