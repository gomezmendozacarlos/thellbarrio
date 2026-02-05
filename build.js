#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🚀 Iniciando build de Thell Barrio Landing Page...\n');

// Limpiar carpeta dist
console.log('🧹 Limpiando carpeta dist...');
if (fs.existsSync('./dist')) {
    fs.rmSync('./dist', { recursive: true, force: true });
}
fs.mkdirSync('./dist', { recursive: true });

// Crear estructura de carpetas
console.log('📁 Creando estructura de carpetas...');
fs.mkdirSync('./dist/src', { recursive: true });
fs.mkdirSync('./dist/src/js', { recursive: true });
fs.mkdirSync('./dist/assets', { recursive: true });
fs.mkdirSync('./dist/assets/images', { recursive: true });

// 1. Compilar y minificar CSS con Tailwind
console.log('🎨 Compilando y minificando CSS...');
try {
    execSync('npx tailwindcss -i ./src/css/input.css -o ./dist/output.css --minify', { stdio: 'inherit' });
    console.log('✅ CSS compilado exitosamente');
} catch (error) {
    console.error('❌ Error compilando CSS:', error.message);
    process.exit(1);
}

// 2. Minificar JavaScript
console.log('📦 Minificando JavaScript...');

// Función para minificar JS básico (más conservadora para evitar errores)
function minifyJS(content) {
    return content
        // Eliminar comentarios de línea (pero no dentro de strings)
        .replace(/^[ \t]*\/\/.*$/gm, '')
        // Eliminar comentarios de bloque (pero no dentro de strings)
        .replace(/\/\*[\s\S]*?\*\//g, '')
        // Eliminar líneas vacías
        .replace(/^\s*\n/gm, '')
        // Eliminar espacios al inicio de líneas
        .replace(/^[ \t]+/gm, '')
        // Eliminar espacios al final de líneas  
        .replace(/[ \t]+$/gm, '')
        // Eliminar espacios extra (pero conservar strings)
        .replace(/\n+/g, '\n')
        .trim();
}

// Copiar y minificar archivos JS
const jsFiles = ['main.js', 'menu.js', 'scroll.js', 'concerts.js'];
jsFiles.forEach(file => {
    const srcPath = `./src/js/${file}`;
    const distPath = `./dist/src/js/${file}`;
    
    if (fs.existsSync(srcPath)) {
        const content = fs.readFileSync(srcPath, 'utf8');
        const minifiedContent = minifyJS(content);
        fs.writeFileSync(distPath, minifiedContent);
        console.log(`✅ ${file} minificado`);
    }
});

// 3. Copiar y optimizar HTML
console.log('📄 Optimizando HTML...');

function minifyHTML(content) {
    return content
        // Eliminar comentarios HTML
        .replace(/<!--[\s\S]*?-->/g, '')
        // Eliminar espacios en blanco extra entre tags
        .replace(/>\s+</g, '><')
        // Eliminar espacios en blanco al inicio y final de líneas
        .replace(/^\s+|\s+$/gm, '')
        // Eliminar líneas vacías
        .replace(/\n\s*\n/g, '\n')
        // Eliminar espacios extra
        .replace(/\s+/g, ' ')
        .trim();
}

// Leer y procesar index.html
let htmlContent = fs.readFileSync('./index.html', 'utf8');

// Actualizar rutas en HTML para producción (eliminar parámetros de versión y corregir rutas)
htmlContent = htmlContent
    .replace(/href="\.\/dist\/output\.css"/g, 'href="./output.css"')
    .replace(/src="\.\/src\/js\/main\.js\?v=[\d\.]+"/g, 'src="./src/js/main.js"')
    .replace(/src="\.\/src\/js\/menu\.js\?v=[\d\.]+"/g, 'src="./src/js/menu.js"')
    .replace(/src="\.\/src\/js\/scroll\.js\?v=[\d\.]+"/g, 'src="./src/js/scroll.js"')
    .replace(/src="\.\/src\/js\/concerts\.js\?v=[\d\.]+"/g, 'src="./src/js/concerts.js"');

// Minificar HTML
const minifiedHTML = minifyHTML(htmlContent);
fs.writeFileSync('./dist/index.html', minifiedHTML);
console.log('✅ HTML optimizado');

// 4. Copiar fuentes
console.log('🔤 Copiando fuentes...');
if (fs.existsSync('./src/fonts')) {
    fs.mkdirSync('./dist/src/fonts', { recursive: true });
    copyRecursive('./src/fonts', './dist/src/fonts');
    console.log('✅ Fuentes copiadas');
} else {
    console.log('⚠️ Carpeta src/fonts no encontrada');
}

// 5. Copiar assets (imágenes, iconos, etc.)
console.log('🖼️ Copiando assets...');

function copyRecursive(src, dest) {
    if (!fs.existsSync(src)) {
        console.log(`⚠️ Carpeta ${src} no existe, saltando...`);
        return;
    }
    
    const stats = fs.statSync(src);
    
    if (stats.isDirectory()) {
        if (!fs.existsSync(dest)) {
            fs.mkdirSync(dest, { recursive: true });
        }
        
        const files = fs.readdirSync(src);
        files.forEach(file => {
            copyRecursive(path.join(src, file), path.join(dest, file));
        });
    } else {
        fs.copyFileSync(src, dest);
    }
}

// Copiar carpeta assets si existe
if (fs.existsSync('./assets')) {
    copyRecursive('./assets', './dist/assets');
    console.log('✅ Assets copiados');
} else {
    console.log('⚠️ Carpeta assets no encontrada');
}

// 5. Crear archivo de información del build
console.log('📋 Creando información del build...');

const buildInfo = {
    buildDate: new Date().toISOString(),
    version: require('./package.json').version,
    name: require('./package.json').name,
    environment: 'production'
};

fs.writeFileSync('./dist/build-info.json', JSON.stringify(buildInfo, null, 2));

// 6. Mostrar estadísticas del build
console.log('\n📊 Estadísticas del build:');

function getFileSize(filePath) {
    if (fs.existsSync(filePath)) {
        const stats = fs.statSync(filePath);
        return (stats.size / 1024).toFixed(2) + ' KB';
    }
    return 'N/A';
}

console.log(`   📄 HTML: ${getFileSize('./dist/index.html')}`);
console.log(`   🎨 CSS: ${getFileSize('./dist/output.css')}`);
console.log(`   📦 JS Total: ${jsFiles.map(f => getFileSize(`./dist/src/js/${f}`)).join(', ')}`);

// 7. Crear README para dist
const distReadme = `# Thell Barrio - Build de Producción

Este directorio contiene la versión optimizada y minificada del sitio web.

## Archivos incluidos:
- \`index.html\` - HTML minificado
- \`output.css\` - CSS compilado con Tailwind y minificado
- \`src/js/\` - JavaScript minificado
- \`assets/\` - Imágenes y recursos estáticos
- \`build-info.json\` - Información del build

## Generado el: ${new Date().toLocaleString('es-MX')}

Para servir este sitio, puedes usar cualquier servidor web estático apuntando a este directorio.
`;

fs.writeFileSync('./dist/README.md', distReadme);

console.log('\n🎉 ¡Build completado exitosamente!');
console.log('📦 Archivos generados en: ./dist/');
console.log('\n💡 Para servir el sitio localmente:');
console.log('   npx serve dist');
console.log('   o');
console.log('   python -m http.server 8000 --directory dist'); 