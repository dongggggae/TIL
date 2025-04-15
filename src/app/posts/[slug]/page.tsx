import { getPost } from '../../lib/posts';
import { remark } from 'remark';
import html from 'remark-html';

type Props = {
	params: { slug: string };
};

export default async function PostPage({ params }: Props) {
	const { data, content } = getPost(params.slug);
	const processedContent = await remark().use(html).process(content);
	const contentHtml = processedContent.toString();

	return (
		<main>
			<h1>{data.title}</h1>
			<p>{new Date(data.date).toLocaleDateString()}</p>
			<article className="prose" dangerouslySetInnerHTML={{ __html: contentHtml }} />
		</main>
	);
}
