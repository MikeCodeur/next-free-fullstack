// 👨‍✈️ Spécification : Nous allons créer un formulaire qui utilise une Server Action pour créer un utilisateur
// 🐶 Ajoute 'use client' car nous utilisons des événements du navigateur
// 🤖 Ajoute : 'use client'

import {Button} from '@/components/ui/button'
import {Input} from '@/components/ui/input'
import {Label} from '@/components/ui/label'

// 🐶  Importe la Server Action et useState
// 🤖 Ajoute :
// import { addUser } from './actions'
// import { useState } from 'react'

export default function Page() {
  // 🐶 Crée les états pour le formulaire
  // 🤖 Ajoute :
  // const [message, setMessage] = useState<string>('')
  // const [name, setName] = useState('')
  // const [email, setEmail] = useState('user@gmail.com')

  // 🐶 Cinquième étape : Crée la fonction de soumission du formulaire
  // 🤖 Ajoute la fonction handleSubmit qui appelle addUser

  return (
    <div className="p-8">
      <h1 className="mb-4 text-2xl font-bold">Crééer un utilisateur</h1>

      {/* 🐶 Sixième étape : Crée le formulaire avec les composants shadcn/ui */}
      <form className="space-y-4">
        <div>
          <Label htmlFor="email">Email</Label>
          <Input placeholder="Email" />
        </div>

        <div>
          <Label htmlFor="name">Nom</Label>
          <Input placeholder="Nom" />
        </div>

        <Button type="submit">Creation d&apos;un user</Button>

        {/* 🐶 Septième étape : Affiche le message de retour */}
        {/* 🤖 Ajoute le paragraphe qui affiche le message avec la couleur appropriée */}
      </form>
    </div>
  )
}
