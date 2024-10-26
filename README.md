<p>
  <img src="https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white" alt="vite.js">
  <img src="https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB" alt="react">
  <img src="https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white" alt="typescript">
  <img src="https://img.shields.io/badge/SASS-hotpink.svg?style=for-the-badge&logo=SASS&logoColor=white" alt="sass">
</p>

# 📖 French Reading Tool

An interactive tool designed to simplify reading and learning French from books! This tool allows you to upload images of French text, extract the text using OCR, translate it into English, hear the pronunciation, and get definitions for individual words with a single click. Perfect for students, language enthusiasts, and readers aiming to enhance their French vocabulary.
<br>

## 🌟 Features

- **OCR Text Extraction**: Upload an image of French text, and the tool extracts readable text.
- **English Translation**: Provides English translations for quick comprehension.
- **Text-to-Speech (TTS)**: Hear the entire text or individual words pronounced in French.
- **Word Definitions**: Click any word to view its French definition, along with the option to hear its pronunciation.
- **Responsive Design**: Optimized for desktop and mobile devices, ensuring a smooth experience on all screens.

<br>

## 🚀 Quick Start

### Prerequisites

- Node.js and npm installed on your system.
- An API service for OCR, translation, and text-to-speech (set up in `api.js`).

### Installation

1. **Clone the Repository**

```bash
git clone https://github.com/your-username/french-reading-tool.git
```

2. **Install Dependencies**

```bash
yarn install
```

3. **Configure API**
   Create a free rapidapi account, get your api key, add it to the `.env` file

### Usage Guide

- Upload an Image: Click the "Télécharger" button and upload a photo of a page from a French book.
- View Extracted Text: The tool will display the text from the image u can update it if needed.
- Translate to English: The English translation will appear once u click on translate.
- Click on Words: Select any word in the French text to view its definition and hear its pronunciation.
- Play Full Text: Use the "Hear Pronunciation" button to listen to the entire French text.

<br>

## 📚 Customization

This tool is built with React and is highly customizable:

- API Services: Swap out APIs for OCR, translation, and TTS in src/api.ts as per your requirements.
- Styling: Adjust styles in the CSS files or update theme settings to match your preferences.

<br>

## 🌐 Technologies Used

- React Query: Data fetching and caching.
- Primer React: UI components for a clean design.

<br>

## ⚠️ Troubleshooting

- Image Not Loading: Ensure the uploaded file is an image format (JPG, PNG).
- API Errors: Check the API configuration in api.js. If you’re exceeding rate limits, consider upgrading to a higher plan or using a different service.
- Slow Load Times: Certain OCR and TTS services may have latency. Try optimizing your API calls or consider caching frequently accessed data.

<br>

## 📝 Contributing

Contributions are welcome! If you find a bug or have a feature request, please create an issue or submit a pull request.
