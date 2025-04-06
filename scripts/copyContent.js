const fs = require('fs');
const path = require('path');

// Função para criar diretório recursivamente
function mkdirRecursive(dir) {
  if (fs.existsSync(dir)) return;
  
  try {
    fs.mkdirSync(dir, { recursive: true });
    console.log(`Created directory: ${dir}`);
  } catch (err) {
    console.error(`Error creating directory ${dir}:`, err);
    throw err;
  }
}

// Função para copiar arquivos
function copyFiles(sourceDir, targetDir) {
  try {
    // Criar diretório de destino se não existir
    mkdirRecursive(targetDir);
    
    // Ler arquivos do diretório fonte
    const files = fs.readdirSync(sourceDir);
    
    // Copiar cada arquivo JSON
    files.forEach(file => {
      if (file.endsWith('.json')) {
        const sourcePath = path.join(sourceDir, file);
        const targetPath = path.join(targetDir, file);
        
        fs.copyFileSync(sourcePath, targetPath);
        console.log(`Copied: ${file}`);
      }
    });
    
    console.log('Content files copied successfully!');
  } catch (error) {
    console.error('Error copying content files:', error);
    process.exit(1);
  }
}

// Definir diretórios
const sourceDir = path.resolve(process.cwd(), 'src/contents/posts');
const targetDir = path.resolve(process.cwd(), 'dist/contents/posts');

// Executar cópia
copyFiles(sourceDir, targetDir); 