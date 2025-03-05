import {auth} from '@/lib/auth'
import {redirect} from 'next/navigation'

export default async function Dashboard() {
  const user = await auth()
  if (!user) {
    redirect('/login')
  }
  return <div>Dashboard</div>
}
