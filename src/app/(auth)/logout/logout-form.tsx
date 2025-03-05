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

export function LogoutForm({className, ...props}: React.ComponentProps<'div'>) {
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
          <form className="grid gap-6">
            <div className="flex flex-col gap-4">
              <Button variant="destructive" className="w-full">
                Se déconnecter
              </Button>
              <Button variant="outline" className="w-full">
                Annuler
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
