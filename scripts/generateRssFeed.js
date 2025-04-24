import { Feed } from 'feed';
import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function generateRssFeed() {
    try {
        // Create Feed instance
        const feed = new Feed({
            title: "Palavra em Graça",
            description: "Reflexões cristãs e estudos bíblicos para edificação espiritual",
            id: "https://palavraemgraca.com.br/",
            link: "https://palavraemgraca.com.br/",
            language: "pt-BR",
            image: "https://palavraemgraca.com.br/images/logo.webp",
            favicon: "https://palavraemgraca.com.br/favicon.ico",
            copyright: `Todos os direitos reservados ${new Date().getFullYear()}, Palavra em Graça`,
            generator: "Feed for Node.js",
            feedLinks: {
                rss2: "https://palavraemgraca.com.br/feed.xml",
            },
        });

        // Read posts directory
        const postsDir = path.join(process.cwd(), 'public', 'contents', 'markdown');
        const files = await fs.readdir(postsDir);

        // Process each post
        for (const file of files) {
            if (file.endsWith('.md')) {
                const filePath = path.join(postsDir, file);
                const fileContent = await fs.readFile(filePath, 'utf8');
                
                // Parse markdown frontmatter
                const { data, content } = matter(fileContent);
                const slug = file.replace(/\.md$/, '');
                
                // Extract first paragraph for content preview
                const contentPreview = content
                    .replace(/^#(.*)$/gm, '') // Remove headers
                    .split('\n\n')[0] // Get first paragraph
                    .trim();
                
                feed.addItem({
                    title: data.title,
                    id: `https://palavraemgraca.com.br/${slug}`,
                    link: `https://palavraemgraca.com.br/${slug}`,
                    description: data.description,
                    content: data.description || contentPreview.substring(0, 200) + '...',
                    author: [
                        {
                            name: data.author || "Palavra em Graça",
                        },
                    ],
                    date: new Date(data.datePublished),
                    image: data.featuredImage ? `https://palavraemgraca.com.br${data.featuredImage}` : undefined,
                    category: data.tags.map(tag => ({ name: tag }))
                });
            }
        }

        // Generate the RSS feed
        const publicDir = path.join(process.cwd(), 'public');
        
        // Ensure public directory exists
        await fs.mkdir(publicDir, { recursive: true });
        
        // Write the feed to file
        await fs.writeFile(
            path.join(publicDir, 'feed.xml'),
            feed.rss2()
        );

        console.log('RSS feed generated successfully!');
    } catch (error) {
        console.error('Error generating RSS feed:', error);
    }
}

generateRssFeed(); 