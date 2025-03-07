import {auth} from '@/lib/auth'
import {redirect} from 'next/navigation'
import CryptoDashboard from './dashboard'

export default async function Dashboard() {
  const user = await auth()
  if (!user) {
    redirect('/login')
  }
  return <CryptoDashboard />
}
