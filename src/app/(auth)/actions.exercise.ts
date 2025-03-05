'use server'

// import {signIn, signOut} from '@/lib/auth'
// import {AuthError} from 'next-auth'
// import {isRedirectError} from 'next/dist/client/components/redirect-error'
// import {redirect} from 'next/navigation'
// import {createUser} from '@/db'

/**
 * Action de login utilisant NextAuth
 *
 * TODO: Implémenter la fonction login
 * 1. Récupérer l'email et le mot de passe depuis le FormData
 * 2. Valider que les champs sont présents
 * 3. Appeler signIn de NextAuth avec les credentials
 * 4. Gérer la redirection vers /dashboard en cas de succès
 * 5. Gérer les erreurs d'authentification
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function login(formData: FormData) {
  console.log('login appelé')
  // TODO: Implémenter la fonction login
}

/**
 * Action d'inscription d'un nouvel utilisateur
 *
 * TODO: Implémenter la fonction register
 * 1. Récupérer les champs du formulaire (name, email, password, confirmPassword)
 * 2. Valider que tous les champs sont présents
 * 3. Vérifier que les mots de passe correspondent
 * 4. Créer l'utilisateur dans la base de données
 * 5. Connecter l'utilisateur avec signIn
 * 6. Rediriger vers /dashboard
 * 7. Gérer les erreurs
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function register(formData: FormData) {
  console.log('register appelé')
  // TODO: Implémenter la fonction register
}

/**
 * Action de déconnexion
 *
 * TODO: Implémenter la fonction logout
 * 1. Appeler signOut de NextAuth
 * 2. Gérer les erreurs si nécessaire
 */
export async function logout() {
  console.log('logout appelé')
  // TODO: Implémenter la fonction logout
}
