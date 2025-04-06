import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function copyContent() {
    try {
        const sourceDir = path.join(process.cwd(), 'src', 'contents', 'posts');
        const targetDir = path.join(process.cwd(), 'dist', 'contents', 'posts');

        // Criar diretório de destino se não existir
        await fs.mkdir(targetDir, { recursive: true });

        // Ler todos os arquivos do diretório fonte
        const files = await fs.readdir(sourceDir);

        // Copiar cada arquivo JSON
        for (const file of files) {
            if (file.endsWith('.json')) {
                const sourcePath = path.join(sourceDir, file);
                const targetPath = path.join(targetDir, file);
                await fs.copyFile(sourcePath, targetPath);
                console.log(`Copied ${file} to dist/contents/posts`);
            }
        }

        console.log('Content files copied successfully!');
    } catch (error) {
        console.error('Error copying content files:', error);
        process.exit(1);
    }
}

copyContent(); 