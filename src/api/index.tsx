import axios from 'axios';

const RAPIDAPI_API_KEY = import.meta.env.VITE_RAPIDAPI_KEY;

// OCR function using Optiic API
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

// Translation function using LibreTranslate API
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

// TTS function using Play.ht API
const getAudioForText = async (text: string) => {
  return await axios.get('https://streamlined-edge-tts.p.rapidapi.com/tts', {
    params: {
      text: text,
      voice: 'fr-FR-Denise'
    },
    headers: {
      'x-rapidapi-key': '35d8516dbdmsh12f5264af41fa87p1281bfjsn758f07786953',
      'x-rapidapi-host': 'streamlined-edge-tts.p.rapidapi.com'
    },
    responseType: 'arraybuffer'
  }).then(response => `data:${response.headers['content-type']};base64,${btoa(String.fromCharCode(...new Uint8Array(response.data)))}`)
};

// Dictionary function using WordsAPI
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