import { VercelRequest, VercelResponse } from '@vercel/node';
import { getPaginatedPosts } from '../../src/utils/serverBlogUtils';
import fs from 'fs';

export default async function handler(
  request: VercelRequest,
  response: VercelResponse
) {
  try {
    console.log('API Request:', {
      method: request.method,
      query: request.query,
      env: process.env.NODE_ENV,
      postsDir: process.env.POSTS_DIRECTORY,
      cwd: process.cwd(),
      files: fs.readdirSync(process.cwd())
    });

    if (request.method !== 'GET') {
      return response.status(405).json({ error: 'Method not allowed' });
    }

    const page = Number(request.query.page) || 1;
    const limit = Number(request.query.limit) || 10;

    console.log('Fetching posts:', { 
      page, 
      limit,
      postsDirectory: process.env.POSTS_DIRECTORY,
      exists: fs.existsSync(process.env.POSTS_DIRECTORY || '')
    });

    const result = getPaginatedPosts(page, limit);

    console.log('Posts fetched:', {
      totalPosts: result.totalPosts,
      postsReturned: result.posts.length,
      currentPage: page,
      totalPages: result.totalPages
    });

    response.setHeader('Cache-Control', 'public, s-maxage=10, stale-while-revalidate=59');
    return response.status(200).json(result);
  } catch (error) {
    console.error('Error in posts API:', error);
    return response.status(500).json({ 
      error: 'Internal Server Error',
      details: error instanceof Error ? error.message : String(error),
      env: process.env.NODE_ENV,
      postsDir: process.env.POSTS_DIRECTORY
    });
  }
} 