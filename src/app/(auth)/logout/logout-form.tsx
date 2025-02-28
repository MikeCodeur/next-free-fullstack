import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

import Link from 'next/link'
import {redirect} from 'next/navigation'
import React from 'react'
import LogoutButton from './logout-button'
import {getAuthUser} from '@/lib/auth'

export default async function Logout() {
  const user = await getAuthUser()
  if (!user) {
    redirect('/login')
  }

  return (
    <Card className="mx-auto min-w-xl">
      <CardHeader>
        <CardTitle className="text-2xl">Déconnexion</CardTitle>
        <CardDescription>Se déconnecter</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <LogoutButton />
        </div>
        <div className="mt-4 text-center text-sm">
          Have an account ?&nbsp;
          <Link href="/dashboard" className="underline">
            Dashboard
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
