import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import Link from "next/link";
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Button } from '../components/ui/button';


export interface BlogPostProps {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export const BASE_API_URL = "https://jsonplaceholder.typicode.com";
const POSTS_PER_PAGE = 9;
const TOTAL_POSTS = 100; // jsonplaceholder has 100 posts
const TOTAL_PAGES = Math.ceil(TOTAL_POSTS / POSTS_PER_PAGE);

async function fetchPosts(page: number): Promise<BlogPostProps[]> {
  const response = await fetch(
    `${BASE_API_URL}/posts?_page=${page}&_limit=${POSTS_PER_PAGE}`
  );
  return response.json();
}
interface BlogPageProps {
  searchParams: Promise<{
    page?: string;
  }>;
}

export default async function Blog({ searchParams }: BlogPageProps) {
  const params = await searchParams;   // 👈 unwrap the Promise
  const currentPage = Number(params.page) || 1;

  const blogPosts = await fetchPosts(currentPage);

  return (
    <div className="space-y-6">

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogPosts.map((post) => (
          <Link key={post.id} href={`/blog/${post.id}`}>
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <CardTitle className="text-base">{post.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground line-clamp-3">
                  {post.body}
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center gap-2 pt-6">
        {currentPage > 1 && (
            <Link href={`/blog?page=${currentPage - 1}`}>
                <Button size="lg" className="border bg-white hover:bg-muted">
                    <ArrowLeft className="size-5 transition-transform group-hover:translate-x-1 text-black" />
                </Button>
            </Link>
            )}
        {Array.from({ length: TOTAL_PAGES }).map((_, index) => {
          const page = index + 1;
          const isActive = page === currentPage;

          return (
            <Link
              key={page}
              href={`/blog?page=${page}`}
              className={`px-4 py-2 border rounded-md text-sm ${
                isActive
                  ? "bg-black text-white"
                  : "hover:bg-muted"
              }`}
            >
              {page}
            </Link>
          );
        })}
        {currentPage < TOTAL_PAGES && (
            <Link href={`/blog?page=${currentPage + 1}`}>
                <Button size="lg" className="border bg-white hover:bg-muted">
                    <ArrowRight className="size-5 transition-transform group-hover:translate-x-1 text-black" />
                </Button>
            </Link>
            )}
      </div>
    </div>
  );
}