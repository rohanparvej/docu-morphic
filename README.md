# 🌀 Docu-Morphic

A **privacy-first, fully client-side document & image converter** built with **pure HTML, CSS, and JavaScript**.  
No backend. No uploads. No tracking. Everything runs **locally in your browser**.

[**🚀 View Live Demo**](https://rohanparvej.github.io/docu-morphic/)

---

## ✨ Features

### 🖼 Image Conversion
- **Cross-Format**: Convert between **PNG**, **JPEG**, and **WEBP**.
- **PDF Export**: Convert any image into a high-quality **PDF** document.
- **Processing**: Powered by the HTML5 **Canvas API**.
- **Security**: Strict MIME-type validation and SVG sanitization.

### 📄 Document Conversion
- **PDF → TXT**: Extract raw text from PDF files using **Mozilla PDF.js**.
- **TXT → PDF**: Generate formatted PDF documents from plain text files.
- **Zero-Server**: Processing happens in your browser's memory—files never touch a server.

### 🔐 Privacy & Security
- **100% Client-Side**: No data leaves your device.
- **No Persistence**: No cookies, analytics, or database storage.
- **Memory Safety**: Local processing ensures your documents stay private.

---

## 🧱 Tech Stack

| Layer | Technology |
| :--- | :--- |
| **UI/UX** | HTML5, CSS3 (Modern Flex/Grid, Glassmorphism) |
| **Logic** | Vanilla JavaScript (ES6+ Modules) |
| **Image Engine** | Canvas API |
| **PDF Engine** | PDF.js (Mozilla) & jsPDF |
| **Hosting** | GitHub Pages |

---

## 📦 Libraries Used

All libraries are **MIT/Apache licensed**, making this project 100% Open Source.

- **PDF.js (Mozilla)**: Handles PDF parsing and text extraction.
- **jsPDF**: Handles the creation of PDF documents from text and images.

---

## 📁 Project Structure

```text
/
├── index.html          # Main application structure
├── index.css           # Custom animations & layout
├── script.js           # UI state management & DOM events
├── converter.js        # Core conversion logic (Pure functions)
└── README.md           # Documentation
```
---
### 🚀 How It Works

#### Selection: User selects or drags a file into the workspace.
#### Validation: JavaScript validates the MIME-type and file size.
#### Transformation: Images are rendered to an invisible <canvas> and re-encoded.
#### PDFs are parsed page-by-page to extract text strings.
#### Delivery: A local Blob URL is generated, and a download event is triggered.

---
## ⚠️ Limitations & Roadmap
Current Capabilities:
✅ Image → Image (PNG, JPG, WEBP)

✅ Image → PDF

✅ PDF → TXT

✅ TXT → PDF
---
### Roadmap:
🛠 Batch Conversion: Convert multiple images at once.

🛠 PWA Support: Fully offline capability using Service Workers.

🛠 Dark Mode: System-preference-based theme switching.

🛠 Advanced PDF: Image-based PDF to OCR (experimental).
---
## 🧪 Why No Backend?
This project intentionally avoids servers to:

Maximize Privacy: Guaranteed security for sensitive documents.

Zero Cost: Hosted entirely on GitHub Pages with no server overhead.

Speed: No upload/download latency—processing is limited only by your CPU.
