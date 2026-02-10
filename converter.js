/* =========================================================
   IMAGE CONVERSION
========================================================= */

export async function convertImage(file, targetType, quality = 0.92) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        const reader = new FileReader();
        reader.onload = () => (img.src = reader.result);
        img.onload = () => {
            const canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0);
            canvas.toBlob(blob => {
                if (!blob) return reject(new Error('Conversion failed'));
                resolve(blob);
            }, targetType, quality);
        };
        reader.readAsDataURL(file);
    });
}

export async function convertImageToPdf(file) {
    const jsPDFLib = (window.jspdf && window.jspdf.jsPDF) || window.jsPDF;
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            const img = new Image();
            img.onload = () => {
                const doc = new jsPDFLib({
                    orientation: img.width > img.height ? 'l' : 'p',
                    unit: 'px',
                    format: [img.width, img.height]
                });
                doc.addImage(e.target.result, 'JPEG', 0, 0, img.width, img.height);
                resolve(doc.output('blob'));
            };
            img.src = e.target.result;
        };
        reader.readAsDataURL(file);
    });
}

/* =========================================================
   DOCUMENT CONVERSION
========================================================= */

export async function convertPdfToText(file) {
    const pdfjsLib = window['pdfjs-dist/build/pdf'];
    pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.worker.min.js';

    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    let text = '';

    for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const content = await page.getTextContent();
        text += content.items.map(item => item.str).join(' ') + '\n\n';
    }
    return new Blob([text], { type: 'text/plain' });
}

export async function convertTextToPdf(file) {
    const jsPDFLib = (window.jspdf && window.jspdf.jsPDF) || window.jsPDF;
    const doc = new jsPDFLib();
    const text = await file.text();
    const lines = doc.splitTextToSize(text, 180);
    doc.text(lines, 10, 10);
    return doc.output('blob');
}

/* =========================================================
   DOWNLOAD HELPER
========================================================= */

export function downloadBlob(blob, filename) {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
}