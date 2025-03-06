import {getUserByEmail} from '@/db'

const Page = async () => {
  const user = await getUserByEmail('user@gmail.com')
  console.log('user', user)
  return (
    <div>
      <p>Appel de la BDD</p>
      <p>user : {user?.name}</p>
    </div>
  )
}

export default Page
