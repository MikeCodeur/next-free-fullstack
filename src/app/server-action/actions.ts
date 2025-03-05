'use server'

import {createUser, getUserByEmail} from '@/db'

export async function addUser(name: string, email: string) {
  if (!email || !name) {
    return {error: 'Données invalides'}
  }
  const user = await getUserByEmail(email)
  if (user) {
    return {error: 'Utilisateur existe déjà'}
  }
  const userCreated = await createUser({
    name,
    email,
    role: 'user',
  })
  return {success: true, user: userCreated}
}
