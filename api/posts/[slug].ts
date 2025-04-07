import { VercelRequest, VercelResponse } from '@vercel/node';
import { getPostBySlug } from '../../src/utils/serverBlogUtils';

export default async function handler(
  request: VercelRequest,
  response: VercelResponse
) {
  try {
    console.log('API Request:', {
      method: request.method,
      query: request.query
    });

    if (request.method !== 'GET') {
      return response.status(405).json({ error: 'Method not allowed' });
    }

    const { slug } = request.query;

    if (!slug || Array.isArray(slug)) {
      return response.status(400).json({ error: 'Invalid slug' });
    }

    console.log('Fetching post:', { slug });

    const post = getPostBySlug(slug);

    if (!post) {
      return response.status(404).json({ error: 'Post not found' });
    }

    console.log('Post found:', {
      slug: post.slug,
      headline: post.headline
    });

    response.setHeader('Cache-Control', 'public, s-maxage=10, stale-while-revalidate=59');
    return response.status(200).json(post);
  } catch (error) {
    console.error('Error in post API:', error);
    return response.status(500).json({ error: 'Internal Server Error' });
  }
} 