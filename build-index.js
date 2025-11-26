const fs = require('fs');
const path = require('path');

// Configuration
const IGNORE_FOLDERS = ['.git', '.claude', 'node_modules', '.github'];
const IGNORE_FILES = ['index.html', 'styles.css', 'script.js', 'README.md', 'desktop.ini', 'build-index.js', 'package.json', 'package-lock.json', '.gitignore'];

// File icon mapping based on extension
const FILE_ICONS = {
    pdf: '📄',
    doc: '📝',
    docx: '📝',
    xls: '📊',
    xlsx: '📊',
    csv: '📊',
    txt: '📝',
    html: '🌐',
    htm: '🌐',
    zip: '📦',
    rar: '📦',
    png: '🖼️',
    jpg: '🖼️',
    jpeg: '🖼️',
    gif: '🖼️',
    mp4: '🎥',
    mp3: '🎵',
    default: '📄'
};

function getFileIcon(filename) {
    const ext = path.extname(filename).toLowerCase().substring(1);
    return FILE_ICONS[ext] || FILE_ICONS.default;
}

function shouldIgnore(name) {
    return IGNORE_FOLDERS.includes(name) || IGNORE_FILES.includes(name) || name.startsWith('.');
}

function scanDirectory(dirPath, basePath = '') {
    const items = fs.readdirSync(dirPath, { withFileTypes: true });
    const structure = {
        folders: [],
        files: []
    };

    items.forEach(item => {
        if (shouldIgnore(item.name)) return;

        const itemPath = path.join(dirPath, item.name);
        const relativePath = basePath ? `${basePath}/${item.name}` : item.name;

        if (item.isDirectory()) {
            const subStructure = scanDirectory(itemPath, relativePath);
            // Only include folders that have content
            if (subStructure.folders.length > 0 || subStructure.files.length > 0) {
                structure.folders.push({
                    name: item.name,
                    path: relativePath,
                    ...subStructure
                });
            }
        } else if (item.isFile()) {
            structure.files.push({
                name: item.name,
                path: relativePath,
                icon: getFileIcon(item.name)
            });
        }
    });

    // Sort folders and files alphabetically
    structure.folders.sort((a, b) => a.name.localeCompare(b.name, 'da'));
    structure.files.sort((a, b) => a.name.localeCompare(b.name, 'da'));

    return structure;
}

function generateFileHTML(file, indent = 0) {
    const spaces = '    '.repeat(indent);
    const target = file.name.endsWith('.html') ? ' target="_blank"' : '';
    const download = !file.name.endsWith('.html') ? ' download' : '';

    return `${spaces}<div class="file-item">
${spaces}    <a href="${file.path}"${target}${download}>
${spaces}        <span class="file-icon">${file.icon}</span> ${file.name}
${spaces}    </a>
${spaces}</div>`;
}

function generateFolderHTML(folder, indent = 0, level = 2) {
    const spaces = '    '.repeat(indent);
    const folderClass = level === 2 ? 'folder' : (level === 3 ? 'subfolder' : 'nested-folder');
    const titleTag = `h${level}`;

    let html = `${spaces}<div class="${folderClass}">
${spaces}    <${titleTag} class="folder-title" onclick="toggleFolder(this)">
${spaces}        <span class="folder-icon">📁</span> ${folder.name}
${spaces}    </${titleTag}>
${spaces}    <div class="folder-content">`;

    // Add files first
    folder.files.forEach(file => {
        html += '\n' + generateFileHTML(file, indent + 2);
    });

    // Then add subfolders
    folder.folders.forEach(subfolder => {
        html += '\n' + generateFolderHTML(subfolder, indent + 2, Math.min(level + 1, 4));
    });

    html += `\n${spaces}    </div>
${spaces}</div>`;

    return html;
}

function generateHTML(structure) {
    const currentDate = new Date().toLocaleDateString('da-DK', { year: 'numeric', month: 'long' });

    let foldersHTML = '';
    structure.folders.forEach(folder => {
        foldersHTML += generateFolderHTML(folder, 4, 2) + '\n\n';
    });

    // Remove trailing newlines
    foldersHTML = foldersHTML.trim();

    return `<!DOCTYPE html>
<html lang="da">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>FSK 2025 - Kursusmaterialer</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <div class="container">
        <header>
            <h1>FSK 2025 - Kursusmaterialer</h1>
            <p class="subtitle">Velkommen til kursusmaterialerne. Klik på filerne for at downloade dem.</p>
        </header>

        <main>
            <div class="folder-tree" id="folderTree">
${foldersHTML}
            </div>
        </main>

        <footer>
            <p>FSK 2025 Kursusmaterialer | Opdateret: ${currentDate}</p>
        </footer>
    </div>

    <script src="script.js"></script>
</body>
</html>
`;
}

// Main execution
try {
    console.log('Scanning directory structure...');
    const structure = scanDirectory('.');

    console.log(`Found ${structure.folders.length} top-level folders`);

    console.log('Generating index.html...');
    const html = generateHTML(structure);

    fs.writeFileSync('index.html', html, 'utf8');
    console.log('✓ index.html generated successfully!');

    // Show summary
    const countFiles = (struct) => {
        let count = struct.files.length;
        struct.folders.forEach(f => count += countFiles(f));
        return count;
    };
    console.log(`Total files: ${countFiles(structure)}`);

} catch (error) {
    console.error('Error generating index.html:', error);
    process.exit(1);
}
