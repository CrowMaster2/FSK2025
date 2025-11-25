function toggleFolder(element) {
    const folderContent = element.nextElementSibling;

    if (folderContent && folderContent.classList.contains('folder-content')) {
        folderContent.classList.toggle('open');

        const icon = element.querySelector('.folder-icon');
        if (icon) {
            if (folderContent.classList.contains('open')) {
                icon.textContent = icon.textContent.includes('📁') ? '📂' : '📂';
            } else {
                icon.textContent = '📁';
            }
        }
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const mainFolders = document.querySelectorAll('.folder > .folder-title');
    mainFolders.forEach(folder => {
        folder.click();
    });
});
