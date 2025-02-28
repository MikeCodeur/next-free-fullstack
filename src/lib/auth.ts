import NextAuth from 'next-auth'
import {authConfig} from './auth-config'

export const {
  auth,
  signIn,
  signOut,
  handlers: {GET, POST},
} = NextAuth({
  ...authConfig,
})

export const getAuthUser = async () => {
  const session = await auth()
  return session?.user
}
