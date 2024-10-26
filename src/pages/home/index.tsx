import { useState } from 'react'
import { useMutation, useQuery } from 'react-query'
import api from 'src/api'
import {
  Button,
  TextInput,
  Box,
  Text,
  Spinner,
  Heading,
  Textarea,
} from '@primer/react' // Importing Primer components
import { Pagehead } from '@primer/react/deprecated'

export default function FrenchReadingTool() {
  const [selectedImage, setSelectedImage] = useState(null)
  const [extractedText, setExtractedText] = useState('')
  const [selectedWord, setSelectedWord] = useState('')
  const [ocrText, setOcrText] = useState('')

  // OCR mutation
  const { mutate: ocrMutation, isLoading: OCRLoading } = useMutation(
    api.extractText,
    {
      onSuccess: (text) => {
        setOcrText(text)
      },
      onError: () => {
        alert('❌ Error extracting text, please try again.')
      },
    },
  )

  // Translation query
  const { data: translation, isLoading: translateLoading } = useQuery(
    ['translate', extractedText],
    () => api.translateText(extractedText),
    {
      enabled: !!extractedText,
    },
  )

  // TTS mutation
  const { mutate: ttsMutation, isLoading: TTSLoading } = useMutation(
    api.getAudioForText,
    {
      onSuccess: (base64Audio: string) => {
        const audioElement = new Audio(base64Audio)
        audioElement.play()
      },
      onError: () => {
        alert('❌ Error fetching audio, please try again.')
      },
    },
  )

  // Dictionary query
  const { data: wordDefinition, isLoading: dictionaryLoading } = useQuery(
    ['dictionary', selectedWord],
    () => api.fetchWordDefinition(selectedWord),
    {
      enabled: !!selectedWord,
    },
  )

  const handleImageUpload = (e: any) => {
    const file = e.target.files[0]
    if (file) {
      setSelectedImage(file)
      ocrMutation(file)
    }
  }

  const handleWordClick = (word: string) => {
    setSelectedWord(word)
  }

  const handlePlayAudio = () => {
    ttsMutation(extractedText)
  }

  return (
    <Box className="anim-fade-in" p={40}>
      {/* Header */}
      <Pagehead>
        <Heading
          variant="large"
          as="h1"
          sx={{ mb: 20, lineHeight: 1.1 }}
        >
          📖
          <br />
          <br />
          OUTIL DE LECTURE FRANÇAIS
        </Heading>
        {extractedText && <Button
          onClick={() => window.location.reload()}
          variant="danger"
        >Recommencer</Button>}
      </Pagehead>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: ['1fr', '1fr', '25% minmax(0, 1fr)'],
          columnGap: '40px',
        }}
      >
        <Box>
          {!extractedText && (
            <>
              <Text sx={{ mb: 15 }}>
                Soumettez une page que vous lisez dans votre livre en français
                en téléchargeant une image ci-dessous. 😊
              </Text>
              <br />
              <br />
              {/* Upload Image */}
              <TextInput
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                sx={{ width: '100%', padding: 40 }}
                aria-label="Upload Image"
              />
            </>
          )}

          {/* Word Definition */}
          {selectedWord && (
            <Box mt={4}>
              <Heading variant="medium" as="h3">
                📚 Définition de <strong>{selectedWord}</strong>
              </Heading>
              {dictionaryLoading && (
                <div style={{ textAlign: 'center' }}>
                  <Spinner />
                </div>
              )}
              {!dictionaryLoading && (
                <Text>
                  {wordDefinition[0]?.definition || 'No definition found.'}
                </Text>
              )}
              <br />
              <br />
              <Button
                onClick={() => {
                  ttsMutation(selectedWord)
                }}
                variant="primary"
                disabled={dictionaryLoading}
              >
                <svg width="25" height="25">
                  <use href="#audio" />
                </svg>{' '}
                Écouter la prononciation
              </Button>
            </Box>
          )}
        </Box>
        <Box mt={20}>
          {/* OCR Result */}
          {selectedImage && (
            <Box>
              <Heading variant="medium" as="h2" sx={{ mb: 2 }}>
                📝 Texte extrait
              </Heading>
              {OCRLoading && (
                <div style={{ textAlign: 'center' }}>
                  <Spinner />
                </div>
              )}
              {ocrText && !extractedText && (
                <>
                  <Textarea
                    value={ocrText}
                    onChange={(e) => setOcrText(e.target.value)}
                    rows={10}
                    sx={{ width: '100%', mt: 2, mb: 20 }}
                    aria-label="Edit OCR text"
                  />
                  <Button
                    onClick={() => setExtractedText(ocrText)}
                    variant="primary"
                    disabled={!selectedImage || TTSLoading}
                  >
                    Traduire en anglais
                  </Button>
                </>
              )}
              {extractedText && (
                <Text>
                  {extractedText.split(' ').map((word, index) => (
                    <Text
                      key={index}
                      as="span"
                      onClick={() => handleWordClick(word)}
                      style={{
                        cursor: 'pointer',
                        marginRight: '4px',
                        textDecoration: 'underline',
                      }}
                      aria-label={`Click to hear pronunciation of ${word}`}
                    >
                      {word}
                    </Text>
                  ))}
                </Text>
              )}
            </Box>
          )}

          {/* Translation Result */}
          {selectedImage && extractedText && (
            <Box mt={4}>
              <Heading variant="medium" as="h2" sx={{ mb: 2 }}>
                🔄 Traduction (anglais)
              </Heading>
              {translateLoading && (
                <div style={{ textAlign: 'center' }}>
                  <Spinner />
                </div>
              )}
              {translation && <Text>{translation}</Text>}
            </Box>
          )}

          {/* Full Text TTS */}
          {extractedText && (
            <Box mt={4} mb={25}>
              <Heading variant="medium" as="h4">
                🎤 Lecture complète du texte
              </Heading>
              <br />
              <Button
                onClick={handlePlayAudio}
                variant="primary"
                disabled={!selectedImage || TTSLoading}
              >
                <svg
                  id="audio"
                  xmlns="http://www.w3.org/2000/svg"
                  width="25"
                  height="25"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M5 15V9h4l5-5v16l-5-5zm11 1V7.95q1.125.525 1.813 1.625T18.5 12t-.687 2.4T16 16m-4-7.15L9.85 11H7v2h2.85L12 15.15zM9.5 12"
                  />
                </svg>{' '}
                Lire le texte complet
              </Button>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  )
}
