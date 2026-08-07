import { Blog } from '../../components/Blog';
import { getPosts } from '../../lib/posts';

export default async function BlogPage({
  searchParams,
}: {
  searchParams: { post?: string };
}) {
  const posts = await getPosts();
  return <Blog posts={posts} initialPostId={searchParams.post} />;
}
