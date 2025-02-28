'use client'

import {Button} from '@/components/ui/button'
import {useRouter} from 'next/navigation'
import {useState} from 'react'
import {logout} from '../action'

export default function LogoutButton() {
  const [pending, setPending] = useState(false)
  const router = useRouter()

  const handleClick = async () => {
    setPending(true)
    await logout()
    setPending(false)
    router.push('/login/')
  }

  return (
    <Button onClick={handleClick} disabled={pending}>
      Logout
    </Button>
  )
}
