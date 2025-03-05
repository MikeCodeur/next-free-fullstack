import {GalleryVerticalEnd} from 'lucide-react'

import {LogoutForm} from '@/app/(auth)/logout/logout-form'
import {auth} from '@/lib/auth'
import {redirect} from 'next/navigation'

export default async function LogoutPage() {
  const user = await auth()
  console.log('user', user)
  if (!user) {
    redirect('/login')
  }
  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <a href="#" className="flex items-center gap-2 self-center font-medium">
          <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
            <GalleryVerticalEnd className="size-4" />
          </div>
          Acme Inc.
        </a>
        <LogoutForm />
      </div>
    </div>
  )
}
