'use client'
import React from 'react'
import {cn} from '@/lib/utils'
import {Button} from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {logout} from '@/app/(auth)/actions'
import Link from 'next/link'
import {useRouter} from 'next/navigation'

export function LogoutForm({className, ...props}: React.ComponentProps<'div'>) {
  const [error, setError] = React.useState<string | null>(null)
  const router = useRouter()
  async function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault()
    setError(null)
    try {
      await logout()
      router.push('/login/')
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      console.error('Erreur lors de la déconnexion', error)
    }
  }

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Déconnexion</CardTitle>
          <CardDescription>
            Êtes-vous sûr de vouloir vous déconnecter ?
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6">
            <div className="flex flex-col gap-4">
              {error && <div className="text-destructive text-sm">{error}</div>}
              <Button
                variant="destructive"
                onClick={handleClick}
                className="w-full"
              >
                Se déconnecter
              </Button>
              <Link href="/dashboard">
                <Button variant="outline" className="w-full">
                  Annuler
                </Button>
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
