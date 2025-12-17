import Link from "next/link";

export interface BlogPostProps {
    userId: number;
    id: number;
    title: string;
    body: string;
}

export const BASE_API_URL = "https://jsonplaceholder.typicode.com";

async function fetchPosts(): Promise<BlogPostProps[]> {
    const res = await fetch(`${BASE_API_URL}/posts`);
    return res.json();
}

function processPost(post: BlogPostProps){
    return(
        <li key={post.id} className="border margin-4 p-4">
            <Link href={`/blog/${post.id}`}>
                <h3>{post.title}</h3>
                <h4>Post #{post.id}</h4>
            </Link>
        </li>
    )
}

export default async function Page() {
    const posts = await fetchPosts();

    return(
        <main>
            <h1>Blog Posts</h1>
            <ul>
                {posts.map(processPost)}
            </ul>
        </main>
    )
}