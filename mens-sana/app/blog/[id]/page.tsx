import Link from "next/link";
import { BASE_API_URL } from "../page";
import type { BlogPostProps as Post} from "../page";

interface BlogPostProps{
    params: {id: string};
}

async function fetchPost(id: string): Promise<Post>{
    const res = await fetch(`${BASE_API_URL}/posts/${id}`);
    if (!res.ok){
        throw new Error("Failed to fetch post");
    }
    return res.json();
}

export default async function Page({ params }: BlogPostProps) {
    const parameters = await params;
    const post = await fetchPost(parameters.id);
    return (
        <main>
            <h1 className="text-2xl font-bold">{post.title}</h1>
            <p>{post.body}</p>
            <Link href="/blog" className="border">Back to Blog</Link>
        </main>
    )
}