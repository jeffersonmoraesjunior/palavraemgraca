import { Feed } from 'feed';
import fs from 'fs/promises';
import path from 'path';
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
        const postsDir = path.join(process.cwd(), 'src', 'contents', 'posts');
        const files = await fs.readdir(postsDir);

        // Process each post
        for (const file of files) {
            if (file.endsWith('.json')) {
                const content = await fs.readFile(path.join(postsDir, file), 'utf8');
                const post = JSON.parse(content);

                feed.addItem({
                    title: post.headline,
                    id: `https://palavraemgraca.com.br/${post.slug}`,
                    link: `https://palavraemgraca.com.br/${post.slug}`,
                    description: post.description,
                    content: post.content.introduction,
                    author: [
                        {
                            name: post.author?.name || "Palavra em Graça",
                        },
                    ],
                    date: new Date(post.datePublished),
                    image: post.image ? `https://palavraemgraca.com.br${post.image}` : undefined,
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

        console.log('RSS feed generated successfully! ');
    } catch (error) {
        console.error('Error generating RSS feed:', error);
    }
}

generateRssFeed(); 