import React from 'react'
import {Avatar, AvatarFallback, AvatarImage} from '@/components/ui/avatar'

export default function MaRouteLayout({children}: {children: React.ReactNode}) {
  return (
    <div className="border-border flex h-screen w-full flex-col rounded-lg border">
      {/* Header avec les Items et toggle/avatar */}
      <header className="border-border flex items-center justify-between border-b p-4">
        <div className="flex gap-8">
          <span className="text-sm">Item 1</span>
          <span className="text-sm">Item 1</span>
          <span className="text-sm">Item 1</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="bg-muted flex h-5 w-10 items-center rounded-full p-0.5">
            <div className="bg-primary ml-auto h-4 w-4 rounded-full"></div>
          </div>
          <Avatar>
            <AvatarFallback>U</AvatarFallback>
            <AvatarImage src="" />
          </Avatar>
        </div>
      </header>

      {/* Contenu principal */}
      <main className="flex-1 p-4">{children}</main>

      {/* Footer */}
      <footer className="border-border flex justify-center border-t p-4">
        <span className="text-sm">Item 1</span>
      </footer>
    </div>
  )
}
