import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'posts');

export function getAllPosts() {
	const fileNames = fs.readdirSync(postsDirectory);

	return fileNames
		.map((fileName) => {
			const fullPath = path.join(postsDirectory, fileName);
			const fileContents = fs.readFileSync(fullPath, 'utf8');
			const { data } = matter(fileContents);

			return {
				slug: fileName.replace(/\.md$/, ''),
				...data,
			};
		})
		.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPost(slug: string) {
	const fullPath = path.join(postsDirectory, `${slug}.md`);
	const fileContents = fs.readFileSync(fullPath, 'utf8');
	const { data, content } = matter(fileContents);
	return { data, content };
}
