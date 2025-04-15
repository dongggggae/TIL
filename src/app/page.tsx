import { getAllPosts } from './lib/posts';
import Link from 'next/link';

export default function Home() {
	const posts = getAllPosts();

	return (
		<main>
			<h1>📘 TIL 블로그</h1>
			<ul>
				{posts.map((post: any) => (
					<li key={post.slug}>
						<Link href={`/posts/${post.slug}`}>{post.title}</Link>
						<p>
							{new Date(post.date).toLocaleDateString('ko-KR')} {/* ← ✅ */}
						</p>
					</li>
				))}
			</ul>
		</main>
	);
}
