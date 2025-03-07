'use client'

import React, {useState, useRef, useEffect} from 'react'
import {Button} from '@/components/ui/button'
import {Input} from '@/components/ui/input'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {Avatar} from '@/components/ui/avatar'
import {Separator} from '@/components/ui/separator'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  generateCompletionStream,
  getAvailableModels,
  type OllamaModel,
  type OllamaStreamChunk,
} from './ollama-service'
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter'
import {vscDarkPlus} from 'react-syntax-highlighter/dist/cjs/styles/prism'
import {dracula} from 'react-syntax-highlighter/dist/cjs/styles/prism'
import {atomDark} from 'react-syntax-highlighter/dist/cjs/styles/prism'
import {okaidia} from 'react-syntax-highlighter/dist/cjs/styles/prism'
import {nord} from 'react-syntax-highlighter/dist/cjs/styles/prism'
import {materialDark} from 'react-syntax-highlighter/dist/cjs/styles/prism'
import {nightOwl} from 'react-syntax-highlighter/dist/cjs/styles/prism'

// Objets de thèmes disponibles
const codeThemes = {
  vscDarkPlus,
  dracula,
  atomDark,
  okaidia,
  nord,
  materialDark,
  nightOwl,
}

// Type pour les thèmes
type CodeThemeName = keyof typeof codeThemes

// Icône pour le bouton Stop
const StopIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
  </svg>
)

// Icône pour le bouton Effacer la conversation
const TrashIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M3 6h18"></path>
    <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
    <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
  </svg>
)

// Icône pour le bouton Nouvelle conversation
const PlusIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="12" y1="5" x2="12" y2="19"></line>
    <line x1="5" y1="12" x2="19" y2="12"></line>
  </svg>
)

// Fonction pour formatter le texte avec la coloration syntaxique du code
function formatMessage(content: string, theme: CodeThemeName) {
  // Chercher les blocs de code délimités par ```
  const codeBlockRegex = /```([\w-]+)?\n([\s\S]*?)```/g

  // Si aucun bloc de code n'est trouvé, renvoyer le contenu tel quel
  if (!content.match(codeBlockRegex)) {
    return <div className="whitespace-pre-wrap">{content}</div>
  }

  // Transformer le contenu en éléments React avec du code coloré
  const parts = []
  let lastIndex = 0
  let match

  // eslint-disable-next-line no-cond-assign
  while ((match = codeBlockRegex.exec(content)) !== null) {
    // Ajouter le texte avant le bloc de code
    if (match.index > lastIndex) {
      parts.push(
        <span key={`text-${lastIndex}`} className="whitespace-pre-wrap">
          {content.substring(lastIndex, match.index)}
        </span>
      )
    }

    // Déterminer le langage ou utiliser 'text' par défaut
    let language = match[1] || 'text'

    // Normaliser les noms de langages pour la compatibilité avec Prism
    if (language === 'js') language = 'javascript'
    if (language === 'ts') language = 'typescript'
    if (language === 'py') language = 'python'

    const code = match[2].trim()

    // Ajouter le bloc de code formaté
    parts.push(
      <div
        key={`code-${match.index}`}
        className="my-4 overflow-hidden rounded-md"
      >
        <div className="bg-gray-800 px-4 py-1 text-xs text-gray-400">
          {language}
        </div>
        <SyntaxHighlighter
          language={language}
          style={codeThemes[theme]}
          customStyle={{margin: 0, borderRadius: '0 0 0.375rem 0.375rem'}}
          showLineNumbers={true}
          wrapLines={true}
        >
          {code}
        </SyntaxHighlighter>
      </div>
    )

    lastIndex = match.index + match[0].length
  }

  // Ajouter le reste du texte après le dernier bloc de code
  if (lastIndex < content.length) {
    parts.push(
      <span key={`text-${lastIndex}`} className="whitespace-pre-wrap">
        {content.substring(lastIndex)}
      </span>
    )
  }

  return <div>{parts}</div>
}

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
}

export default function ChatPage() {
  // États locaux
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [ollamaModels, setOllamaModels] = useState<OllamaModel[]>([])
  const [selectedModel, setSelectedModel] = useState('')
  const [context, setContext] = useState<number[] | undefined>()
  const [codeTheme, setCodeTheme] = useState<CodeThemeName>('vscDarkPlus')
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const abortControllerRef = useRef<AbortController | null>(null)
  const [isClient, setIsClient] = useState(false)

  // S'assurer que le rendu se fait uniquement côté client pour éviter les erreurs d'hydratation
  useEffect(() => {
    setIsClient(true)
  }, [])

  // Récupérer les modèles disponibles au chargement
  useEffect(() => {
    if (!isClient) return

    async function fetchModels() {
      try {
        // Récupérer les modèles Ollama
        const ollamaModelList = await getAvailableModels()
        setOllamaModels(ollamaModelList.models)

        // Définir le modèle par défaut si des modèles sont disponibles
        if (ollamaModelList.models.length > 0) {
          setSelectedModel(ollamaModelList.models[0].name)
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des modèles:', error)
      }
    }

    fetchModels()
  }, [isClient])

  // Nettoyer l'AbortController au démontage du composant
  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort()
      }
    }
  }, [])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({behavior: 'smooth'})
  }

  useEffect(() => {
    if (isClient) {
      scrollToBottom()
    }
  }, [messages, isClient])

  // Fonction pour interrompre la génération
  const handleStopGeneration = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort()
      abortControllerRef.current = null
      setIsLoading(false)
    }
  }

  // Fonction pour créer une nouvelle conversation
  const handleNewConversation = () => {
    if (isLoading) return
    setMessages([])
    setContext(undefined)
  }

  // Fonction pour effacer les messages de la conversation actuelle
  const handleClearConversation = () => {
    if (isLoading) return
    setMessages([])
    setContext(undefined)
  }

  // Générateur d'ID simple et sûr
  const generateId = () => {
    return `id-${Date.now()}-${Math.floor(Math.random() * 10000)}`
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (input.trim() === '' || isLoading || !selectedModel) return

    // Ajouter le message de l'utilisateur
    const userMessage: Message = {
      id: generateId(),
      role: 'user',
      content: input,
    }

    setMessages((prev) => [...prev, userMessage])

    const userPrompt = input
    setInput('')
    setIsLoading(true)

    // Ajouter un message vide pour l'assistant (pour le streaming)
    const assistantMessageId = generateId()
    const emptyAssistantMessage: Message = {
      id: assistantMessageId,
      role: 'assistant',
      content: '',
    }

    setMessages((prev) => [...prev, emptyAssistantMessage])

    try {
      let assistantResponse = ''

      // Créer un nouveau AbortController pour cette requête
      abortControllerRef.current = new AbortController()
      const signal = abortControllerRef.current.signal

      await generateCompletionStream(
        {
          model: selectedModel,
          prompt: userPrompt,
          context, // Utiliser le contexte de la conversation
        },
        (chunk: OllamaStreamChunk) => {
          // Mettre à jour la réponse en cours avec le nouveau fragment
          assistantResponse += chunk.response

          // Mettre à jour le message de l'assistant
          setMessages((prev) =>
            prev.map((msg) =>
              msg.id === assistantMessageId
                ? {...msg, content: assistantResponse}
                : msg
            )
          )
        },
        (finalResponse) => {
          // Traitement final quand tout est terminé
          setIsLoading(false)
          abortControllerRef.current = null

          // Enregistrer le contexte pour la prochaine requête
          if (finalResponse.context) {
            setContext(finalResponse.context)
          }
        },
        (error) => {
          console.error('Erreur de streaming Ollama:', error)
          setIsLoading(false)
          abortControllerRef.current = null

          // Mettre à jour le message avec l'erreur
          setMessages((prev) =>
            prev.map((msg) =>
              msg.id === assistantMessageId
                ? {
                    ...msg,
                    content:
                      "Désolé, une erreur s'est produite lors de la communication avec le serveur Ollama.",
                  }
                : msg
            )
          )
        },
        signal
      )
    } catch (error) {
      console.error('Erreur lors de la communication avec Ollama:', error)

      // Mettre à jour le message d'erreur
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === assistantMessageId
            ? {
                ...msg,
                content:
                  "Désolé, une erreur s'est produite lors de la communication avec le serveur Ollama.",
              }
            : msg
        )
      )

      setIsLoading(false)
      abortControllerRef.current = null
    }
  }

  return (
    <div className="flex h-screen flex-col">
      <div className="container mx-auto flex max-w-6xl flex-1 flex-col p-4">
        <Card className="flex flex-1 flex-col">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Chat Ollama</CardTitle>
              <div className="flex space-x-2">
                <Select
                  value={codeTheme}
                  onValueChange={(value: CodeThemeName) => setCodeTheme(value)}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Thème du code" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.keys(codeThemes).map((theme) => (
                      <SelectItem key={theme} value={theme}>
                        {theme}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select
                  value={selectedModel}
                  onValueChange={setSelectedModel}
                  disabled={isLoading || ollamaModels.length === 0}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Sélectionner un modèle" />
                  </SelectTrigger>
                  <SelectContent>
                    {ollamaModels.map((model) => (
                      <SelectItem key={model.name} value={model.name}>
                        {model.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleNewConversation}
                  title="Nouvelle conversation"
                  disabled={isLoading}
                >
                  <PlusIcon />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleClearConversation}
                  title="Effacer la conversation"
                  disabled={isLoading || messages.length === 0}
                >
                  <TrashIcon />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="flex-1 overflow-auto p-4">
            <div className="space-y-6">
              {messages.length === 0 && (
                <div className="flex h-full flex-col items-center justify-center space-y-4 p-8 text-center opacity-50">
                  <div className="text-4xl">💬</div>
                  <div className="text-xl font-medium">
                    Commencez une conversation avec Ollama
                  </div>
                  <div className="max-w-md text-gray-500 dark:text-gray-400">
                    Choisissez un modèle dans le menu déroulant et posez votre
                    question dans le champ de texte ci-dessous.
                  </div>
                </div>
              )}
              {messages.map((message) => (
                <div key={message.id} className="flex flex-col space-y-2">
                  <div className="flex items-center space-x-2">
                    <Avatar className="h-8 w-8">
                      {message.role === 'user' ? (
                        <div className="bg-primary flex h-full w-full items-center justify-center text-white">
                          U
                        </div>
                      ) : (
                        <div className="flex h-full w-full items-center justify-center bg-gray-500 text-white">
                          A
                        </div>
                      )}
                    </Avatar>
                    <div className="font-medium">
                      {message.role === 'user' ? 'Vous' : 'Assistant'}
                    </div>
                  </div>
                  <div className="rounded-md border border-gray-200 p-4 dark:border-gray-800">
                    {formatMessage(message.content, codeTheme)}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </CardContent>
          <Separator />
          <CardFooter className="p-4">
            <form onSubmit={handleSubmit} className="flex w-full space-x-2">
              <Input
                placeholder="Entrez votre message ici..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={isLoading || ollamaModels.length === 0}
                className="flex-1"
              />
              {isLoading ? (
                <Button
                  type="button"
                  variant="destructive"
                  onClick={handleStopGeneration}
                >
                  <StopIcon />
                  <span className="ml-2">Arrêter</span>
                </Button>
              ) : (
                <Button
                  type="submit"
                  disabled={
                    input.trim() === '' ||
                    isLoading ||
                    ollamaModels.length === 0 ||
                    !selectedModel
                  }
                >
                  Envoyer
                </Button>
              )}
            </form>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
