'use client'
import React, {useState} from 'react'

import {Button} from '@/components/ui/button'
import {Input} from '@/components/ui/input'
import {Label} from '@/components/ui/label'

import {addUser} from './actions'

export default function Page() {
  const [message, setMessage] = useState<string>('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('user@gmail.com')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const result = await addUser(name, email)
    if (result.error) {
      setMessage(result.error)
    } else {
      setMessage(`utilisateur créé avec succès`)
    }
  }

  return (
    <div className="p-8">
      <h1 className="mb-4 text-2xl font-bold">Créer un utilisateur</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="email" className="mb-1 block text-sm font-medium">
            Email
          </Label>
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
        </div>

        <div>
          <Label htmlFor="newName" className="mb-1 block text-sm font-medium">
            nom
          </Label>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nom"
          />
        </div>

        <Button type="submit" className="rounded px-4 py-2">
          Creation d&apos;un user
        </Button>

        {message && (
          <p
            className={`mt-4 text-sm ${message.includes('succès') ? 'text-green-600' : 'text-red-600'}`}
          >
            {message}
          </p>
        )}
      </form>
    </div>
  )
}
