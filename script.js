import {
    convertImage,
    convertPdfToText,
    convertTextToPdf,
    convertImageToPdf,
    downloadBlob
} from './converter.js';

let selectedImageFile = null;
let selectedDocFile = null;

const imageFormatSelect = document.getElementById('imageFormat');
const docFormatSelect = document.getElementById('docFormat');
const imageConvertBtn = document.getElementById('imageConvertBtn');
const docConvertBtn = document.getElementById('docConvertBtn');

/* UI Navigation */
window.switchMode = (mode) => {
    document.getElementById('view-selection').classList.remove('active');
    setTimeout(() => {
        document.getElementById(mode === 'image' ? 'view-image-tool' : 'view-doc-tool').classList.add('active');
    }, 50);
};

window.goBack = () => {
    document.querySelectorAll('.view-state').forEach(v => v.classList.remove('active'));
    setTimeout(() => document.getElementById('view-selection').classList.add('active'), 50);
};

/* Drag & Drop Logic */
function setupZone(id, inputId, handler) {
    const zone = document.getElementById(id);
    const input = document.getElementById(inputId);
    zone.onclick = () => input.click();
    input.onchange = (e) => handler(e.target.files[0]);
    zone.ondragover = (e) => { e.preventDefault(); zone.classList.add('dragging'); };
    zone.ondragleave = () => zone.classList.remove('dragging');
    zone.ondrop = (e) => { e.preventDefault(); zone.classList.remove('dragging'); handler(e.dataTransfer.files[0]); };
}

setupZone('imageDropZone', 'imageInput', (file) => {
    if (!file) return;
    selectedImageFile = file;
    document.getElementById('imageStatus').innerText = `Selected: ${file.name}`;
    imageConvertBtn.disabled = false;
    imageConvertBtn.classList.add('active');
});

setupZone('docDropZone', 'docInput', (file) => {
    if (!file) return;
    selectedDocFile = file;
    document.getElementById('docStatus').innerText = `Selected: ${file.name}`;
});

docFormatSelect.onchange = () => {
    if (selectedDocFile) {
        docConvertBtn.disabled = false;
        docConvertBtn.classList.add('active');
    }
};

/* Action Listeners */
imageConvertBtn.onclick = async () => {
    const target = imageFormatSelect.value;
    imageConvertBtn.textContent = 'Converting...';
    try {
        let blob;
        let ext;
        if (target === 'application/pdf') {
            blob = await convertImageToPdf(selectedImageFile);
            ext = 'pdf';
        } else {
            blob = await convertImage(selectedImageFile, target);
            ext = target.split('/')[1].replace('jpeg', 'jpg');
        }
        downloadBlob(blob, `morph_${Date.now()}.${ext}`);
    } catch (e) { alert(e.message); }
    imageConvertBtn.textContent = 'Convert Image';
};

docConvertBtn.onclick = async () => {
    docConvertBtn.textContent = 'Converting...';
    try {
        const inputExt = selectedDocFile.name.split('.').pop().toLowerCase();
        const targetFormat = docFormatSelect.value;
        let blob;

        if (inputExt === 'pdf' && targetFormat === 'txt') {
            blob = await convertPdfToText(selectedDocFile);
        } else if (inputExt === 'txt' && targetFormat === 'pdf') {
            blob = await convertTextToPdf(selectedDocFile);
        } else {
            throw new Error(`Cannot convert .${inputExt} to ${targetFormat.toUpperCase()}`);
        }

        downloadBlob(blob, `morph_doc.${targetFormat}`);
    } catch (e) { alert(e.message); }
    docConvertBtn.textContent = 'Convert Document';
};