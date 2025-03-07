export interface OllamaRequestOptions {
  model: string
  prompt: string
  system?: string
  stream?: boolean
  context?: number[]
  options?: {
    temperature?: number
    top_k?: number
    top_p?: number
    num_predict?: number
  }
}

export interface OllamaResponse {
  model: string
  created_at: string
  response: string
  done: boolean
  context?: number[]
  total_duration?: number
  load_duration?: number
  prompt_eval_count?: number
  prompt_eval_duration?: number
  eval_count?: number
  eval_duration?: number
}

export interface OllamaStreamChunk extends OllamaResponse {
  response: string
}

export interface OllamaModel {
  name: string
  size: number
  modified_at: string
  digest: string
}

export interface OllamaModelList {
  models: OllamaModel[]
}

const OLLAMA_API_URL = 'http://localhost:11434/api'

/**
 * Génère une réponse à partir d'un modèle Ollama
 */
export async function generateCompletion(
  options: OllamaRequestOptions
): Promise<OllamaResponse> {
  try {
    const response = await fetch(`${OLLAMA_API_URL}/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(options),
    })

    if (!response.ok) {
      throw new Error(
        `Erreur API Ollama: ${response.status} ${response.statusText}`
      )
    }

    return await response.json()
  } catch (error) {
    console.error('Erreur lors de la génération de la réponse:', error)
    throw error
  }
}

/**
 * Génère une réponse en streaming à partir d'un modèle Ollama
 * @param options Options de la requête
 * @param onChunk Callback appelé pour chaque fragment de réponse
 * @param onComplete Callback appelé lorsque la réponse est complète
 * @param onError Callback appelé en cas d'erreur
 * @param signal Signal d'interruption (AbortController.signal)
 */
export async function generateCompletionStream(
  options: OllamaRequestOptions,
  onChunk: (chunk: OllamaStreamChunk) => void,
  onComplete?: (finalResponse: OllamaResponse) => void,
  onError?: (error: Error) => void,
  signal?: AbortSignal
): Promise<void> {
  // Assurer que le streaming est activé
  const streamingOptions: OllamaRequestOptions = {
    ...options,
    stream: true,
  }

  let fullResponse = ''
  let finalContext: number[] | undefined

  try {
    const response = await fetch(`${OLLAMA_API_URL}/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(streamingOptions),
      signal, // Utiliser le signal d'annulation
    })

    if (!response.ok) {
      throw new Error(
        `Erreur API Ollama: ${response.status} ${response.statusText}`
      )
    }

    // S'assurer que le body est défini
    if (!response.body) {
      throw new Error('Le corps de la réponse est indéfini')
    }

    const reader = response.body.getReader()
    const decoder = new TextDecoder('utf-8')

    // Fonction pour vérifier si le signal a été déclenché
    const checkSignal = () => {
      if (signal?.aborted) {
        // Si le signal a été déclenché, nous arrêtons la lecture
        reader.cancel("Requête interrompue par l'utilisateur")
        if (onComplete) {
          const finalResponseObj: OllamaResponse = {
            model: options.model,
            created_at: new Date().toISOString(),
            response: fullResponse,
            done: true,
          }
          onComplete(finalResponseObj)
        }
        return true
      }
      return false
    }

    let done = false

    while (!done) {
      // Vérifier si la requête a été annulée
      if (checkSignal()) break

      const {value, done: readerDone} = await reader.read()
      done = readerDone

      if (done) break

      const chunk = decoder.decode(value)
      const lines = chunk.split('\n').filter((line) => line.trim() !== '')

      for (const line of lines) {
        // Vérifier à nouveau si la requête a été annulée
        if (checkSignal()) {
          done = true
          break
        }

        try {
          const parsedChunk: OllamaStreamChunk = JSON.parse(line)

          // Mettre à jour la réponse complète
          fullResponse += parsedChunk.response

          // Stocker le contexte final
          if (parsedChunk.context) {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            finalContext = parsedChunk.context
          }

          // Appeler le callback avec le fragment
          onChunk(parsedChunk)

          // Si c'est le dernier fragment, appeler le callback de fin
          if (parsedChunk.done && onComplete) {
            const finalResponseObj: OllamaResponse = {
              ...parsedChunk,
              response: fullResponse,
            }
            onComplete(finalResponseObj)
          }
        } catch (err) {
          console.error('Erreur lors du parsing du fragment:', err, line)
        }
      }
    }
  } catch (error) {
    // Ignorer l'erreur si elle est due à l'annulation
    if (signal?.aborted) {
      console.log("Streaming interrompu par l'utilisateur")
      if (onComplete) {
        const finalResponseObj: OllamaResponse = {
          model: options.model,
          created_at: new Date().toISOString(),
          response: fullResponse,
          done: true,
        }
        onComplete(finalResponseObj)
      }
      return
    }

    console.error('Erreur lors du streaming de la réponse:', error)
    if (onError && error instanceof Error) {
      onError(error)
    } else if (onError) {
      onError(new Error(String(error)))
    }
  }
}

/**
 * Récupère la liste des modèles disponibles sur le serveur Ollama
 */
export async function getAvailableModels(): Promise<OllamaModelList> {
  try {
    const response = await fetch(`${OLLAMA_API_URL}/tags`)

    if (!response.ok) {
      throw new Error(
        `Erreur API Ollama: ${response.status} ${response.statusText}`
      )
    }

    return await response.json()
  } catch (error) {
    console.error('Erreur lors de la récupération des modèles:', error)
    throw error
  }
}
