import axios from 'axios';

const RAPIDAPI_API_KEY = import.meta.env.VITE_RAPIDAPI_KEY;

const executeWithFallback = async (apis) => {
  for (const api of apis) {
    try {
      return await api();
    } catch (error: any) {
      console.warn(`API failed, trying next: ${error.message}`);
    }
  }
  throw new Error('All fallback APIs failed');
};

// OCR 
const extractText = async (image: File) => {
  const formData = new FormData();
  formData.append('image', image);
  const response = await axios.post('https://ocr-extract-text.p.rapidapi.com/ocr', formData, {
    headers: {
      'x-rapidapi-key': RAPIDAPI_API_KEY,
      'x-rapidapi-host': 'ocr-extract-text.p.rapidapi.com'
    }
  });
  return response.data.text;
};

// Translation 
const translateText = async (text: string) => {
  const response = await axios.post('https://openl-translate.p.rapidapi.com/translate', {
    target_lang: 'en',
    text
  }, {
    headers: {
      'x-rapidapi-key': RAPIDAPI_API_KEY,
      'x-rapidapi-host': 'openl-translate.p.rapidapi.com',
      'Content-Type': 'application/json'
    }
  });
  return response.data.translatedText;
};

// TTS 
const getAudioForText = async (text: string) => {
  const apis = [
    () => axios.get('https://streamlined-edge-tts.p.rapidapi.com/tts', {
      params: { text, voice: 'fr-FR-Denise' },
      headers: {
        'x-rapidapi-key': RAPIDAPI_API_KEY,
        'x-rapidapi-host': 'streamlined-edge-tts.p.rapidapi.com'
      },
      responseType: 'arraybuffer'
    }).then(response => `data:${response.headers['content-type']};base64,${btoa(String.fromCharCode(...new Uint8Array(response.data)))}`),

    // () => axios.post('https://lazypy.ro/tts/request_tts.php', {
    //   params: { text, voice: 'fr-FR-Denise' },
    //   headers: {
    //     'x-rapidapi-key': RAPIDAPI_API_KEY,
    //     'x-rapidapi-host': 'text-to-speech27.p.rapidapi.com'
    //   },
    //   responseType: 'arraybuffer'
    // }).then(response => `data:${response.headers['content-type']};base64,${btoa(String.fromCharCode(...new Uint8Array(response.data)))}`)
  ];

  return await executeWithFallback(apis);
};

// Dictionary
const fetchWordDefinition = async (word: string) => {
  const response = await axios.get(`https://dicolink.p.rapidapi.com/mot/${word}/definitions`, {
    headers: {
      'x-rapidapi-key': RAPIDAPI_API_KEY,
      'x-rapidapi-host': 'dicolink.p.rapidapi.com'
    }
  });
  return response.data;
};


export default {
  extractText,
  translateText,
  getAudioForText,
  fetchWordDefinition,
};