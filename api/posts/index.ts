import { VercelRequest, VercelResponse } from '@vercel/node';
import { getPaginatedPosts } from '../../src/utils/serverBlogUtils';
import * as fs from 'fs';
import * as path from 'path';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    console.log('API Request received:', {
      method: req.method,
      query: req.query,
      env: process.env.NODE_ENV,
      cwd: process.cwd(),
      postsDir: process.env.POSTS_DIRECTORY || path.join(process.cwd(), 'public/contents/posts')
    });

    // Log directory contents for debugging
    const postsDir = process.env.POSTS_DIRECTORY || path.join(process.cwd(), 'public/contents/posts');
    console.log('Checking directory:', postsDir);
    if (fs.existsSync(postsDir)) {
      console.log('Directory contents:', fs.readdirSync(postsDir));
    } else {
      console.log('Directory does not exist:', postsDir);
    }

    if (req.method !== 'GET') {
      return res.status(405).json({ error: 'Method not allowed' });
    }

    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;

    console.log('Fetching posts with params:', { page, limit });

    const result = await getPaginatedPosts(page, limit);
    
    console.log('Posts fetched:', {
      total: result.posts.length,
      firstPost: result.posts[0]?.headline || 'No posts found'
    });

    res.setHeader('Cache-Control', 'public, s-maxage=10, stale-while-revalidate=59');
    return res.status(200).json(result);

  } catch (error) {
    console.error('Error in API route:', error);
    return res.status(500).json({
      error: 'Internal Server Error',
      details: error instanceof Error ? error.message : 'Unknown error',
      env: process.env.NODE_ENV,
      cwd: process.cwd()
    });
  }
} 