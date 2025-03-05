import CredentialsProvider from 'next-auth/providers/credentials'
import type {NextAuthConfig} from 'next-auth'
import {getUserByEmail} from '@/db'

export const authConfig: NextAuthConfig = {
  session: {
    strategy: 'jwt',
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: {label: 'Email', type: 'email'},
        password: {label: 'Mot de passe', type: 'password'},
      },
      async authorize(credentials) {
        console.log('authorize credentials', credentials)
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        const user = await getUserByEmail(credentials.email as string)
        console.log('authorize getUserByEmail', user)

        if (!user) {
          return null
        }

        // Dans un environnement de production, vous devriez comparer avec un mot de passe hashé
        if (credentials.password !== user.password) {
          return null
        }
        console.log('authorize password ok', user)

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        }
      },
    }),
  ],
  callbacks: {
    async jwt({token, user}) {
      if (user) {
        token.id = user.id
        token.role = user.role
      }
      return token
    },
    async session({session, token}) {
      if (token && session.user) {
        session.user.id = token.id as string
        session.user.role = token.role as string
      }
      return session
    },
  },
  pages: {
    signIn: '/login',
    error: '/error',
  },
}
